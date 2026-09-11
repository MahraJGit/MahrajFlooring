"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FormSubmit,
  useConfig,
  useDocumentInfo,
  useEditDepth,
  useForm,
  useFormModified,
  useHotkey,
  useLocale,
  useOperation,
  useTranslation,
} from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import type {
  PublishButtonClientProps,
  SaveButtonClientProps,
  SaveDraftButtonClientProps,
} from "payload";
import * as qs from "qs-esm";

/**
 * After a successful save/publish, send editors back to the collection table
 * so the create/edit drawer/tab closes and the new row is visible in the list.
 */
function useNavigateToCollectionList() {
  const router = useRouter();
  const { collectionSlug } = useDocumentInfo();
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();

  return useCallback(() => {
    if (!collectionSlug) return;

    const href = formatAdminURL({
      adminRoute,
      path: `/collections/${collectionSlug}`,
    });

    router.push(href);
  }, [adminRoute, collectionSlug, router]);
}

/** Used by Categories (no drafts). */
export function SaveAndReturnButton({ label: labelProp }: SaveButtonClientProps) {
  const { uploadStatus } = useDocumentInfo();
  const { t } = useTranslation();
  const { submit } = useForm();
  const modified = useFormModified();
  const label = labelProp || t("general:save");
  const ref = useRef<HTMLButtonElement>(null);
  const editDepth = useEditDepth();
  const operation = useOperation();
  const navigateToList = useNavigateToCollectionList();

  const disabled =
    (operation === "update" && !modified) || uploadStatus === "uploading";

  useHotkey({ cmdCtrlKey: true, editDepth, keyCodes: ["s"] }, (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) ref.current?.click();
  });

  const handleSubmit = async () => {
    if (uploadStatus === "uploading") return;

    const result = await submit();
    if (result) navigateToList();
  };

  return (
    <FormSubmit
      buttonId="action-save"
      disabled={disabled}
      onClick={() => {
        void handleSubmit();
      }}
      ref={ref}
      size="medium"
      type="button"
    >
      {label}
    </FormSubmit>
  );
}

/** Used by Posts — manual "Save Draft" (autosave is unchanged). */
export function SaveDraftAndReturnButton(_props: SaveDraftButtonClientProps) {
  const {
    config: {
      routes: { api },
    },
  } = useConfig();
  const {
    id,
    collectionSlug,
    globalSlug,
    setUnpublishedVersionCount,
    uploadStatus,
  } = useDocumentInfo();
  const modified = useFormModified();
  const { code: locale } = useLocale();
  const ref = useRef<HTMLButtonElement>(null);
  const editDepth = useEditDepth();
  const { t } = useTranslation();
  const { submit } = useForm();
  const operation = useOperation();
  const navigateToList = useNavigateToCollectionList();

  const disabled =
    (operation === "update" && !modified) || uploadStatus === "uploading";

  const saveDraft = useCallback(async () => {
    if (disabled) return;

    const search = `?locale=${locale}&depth=0&fallback-locale=null&draft=true`;
    let action: string | undefined;
    let method: "POST" | "PATCH" = "POST";

    if (collectionSlug) {
      action = formatAdminURL({
        apiRoute: api,
        path: `/${collectionSlug}${id ? `/${id}` : ""}${search}`,
      });
      if (id) method = "PATCH";
    }

    if (globalSlug) {
      action = formatAdminURL({
        apiRoute: api,
        path: `/globals/${globalSlug}${search}`,
      });
    }

    const result = await submit({
      action,
      method,
      overrides: { _status: "draft" },
      skipValidation: true,
    });

    if (result) {
      setUnpublishedVersionCount((count) => count + 1);
      navigateToList();
    }
  }, [
    disabled,
    locale,
    collectionSlug,
    id,
    globalSlug,
    api,
    submit,
    setUnpublishedVersionCount,
    navigateToList,
  ]);

  useHotkey({ cmdCtrlKey: true, editDepth, keyCodes: ["s"] }, (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) ref.current?.click();
  });

  return (
    <FormSubmit
      buttonId="action-save-draft"
      buttonStyle="secondary"
      className="save-draft"
      disabled={disabled}
      onClick={() => {
        void saveDraft();
      }}
      ref={ref}
      size="medium"
      type="button"
    >
      {t("version:saveDraft")}
    </FormSubmit>
  );
}

/** Used by Posts — Publish then return to the list. */
export function PublishAndReturnButton(_props: PublishButtonClientProps) {
  const {
    id,
    collectionSlug,
    globalSlug,
    hasPublishedDoc,
    hasPublishPermission,
    setHasPublishedDoc,
    setMostRecentVersionIsAutosaved,
    setUnpublishedVersionCount,
    unpublishedVersionCount,
    uploadStatus,
  } = useDocumentInfo();
  const {
    config: {
      routes: { api },
    },
  } = useConfig();
  const { submit } = useForm();
  const modified = useFormModified();
  const { code: localeCode } = useLocale();
  const { t } = useTranslation();
  const navigateToList = useNavigateToCollectionList();

  const label = t("version:publishChanges");
  const hasNewerVersions = unpublishedVersionCount > 0;
  const canPublish =
    hasPublishPermission &&
    (modified || hasNewerVersions || !hasPublishedDoc) &&
    uploadStatus !== "uploading";

  const publish = useCallback(async () => {
    if (uploadStatus === "uploading") return;

    const params = qs.stringify(
      {
        depth: 0,
        locale: localeCode,
      },
      { addQueryPrefix: true }
    );

    const path = `${
      globalSlug
        ? `/globals/${globalSlug}`
        : `/${collectionSlug}${id ? `/${id}` : ""}`
    }${params}` as `/${string}`;

    const action = formatAdminURL({
      apiRoute: api,
      path,
    });

    const result = await submit({
      action,
      overrides: { _status: "published" },
    });

    if (result) {
      setUnpublishedVersionCount(0);
      setMostRecentVersionIsAutosaved(false);
      setHasPublishedDoc(true);
      navigateToList();
    }
  }, [
    uploadStatus,
    localeCode,
    api,
    globalSlug,
    collectionSlug,
    id,
    submit,
    setUnpublishedVersionCount,
    setMostRecentVersionIsAutosaved,
    setHasPublishedDoc,
    navigateToList,
  ]);

  if (!hasPublishPermission) return null;

  return (
    <FormSubmit
      buttonId="action-save"
      disabled={!canPublish}
      onClick={() => {
        void publish();
      }}
      size="medium"
      type="button"
    >
      {label}
    </FormSubmit>
  );
}
