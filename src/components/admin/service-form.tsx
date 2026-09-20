"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { deleteService, saveService } from "@/actions/services";
import { CharCount, Field } from "@/components/admin/field";
import { MediaPicker } from "@/components/admin/media-picker";
import { PublishStatusBanner } from "@/components/admin/publish-banner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/cms/slug";
import type { ServiceOption, ServiceRecord } from "@/lib/services/queries";
import type { ServiceInput } from "@/lib/validation/service";
import { cn } from "@/lib/utils";

const TABS = [
  "Basic",
  "Availability",
  "Hero",
  "Applications",
  "Performance",
  "Space",
  "Related",
  "SEO",
] as const;

type Tab = (typeof TABS)[number];

function emptyService(): ServiceInput {
  return {
    title: "",
    slug: "",
    parent: "",
    excerpt: "",
    image: "",
    overviewImage: "",
    relatedServices: [],
    sortOrder: 10,
    showInMegaMenu: true,
    detailReady: false,
    detailTitle: "",
    heroTitle: "",
    heroDescription: "",
    overviewTitle: "",
    overviewDescription: "",
    guideTitle: "",
    guideDescription:
      "Every project has unique structural demands. We provide application-specific guidance to protect athletes, users, equipment, and the subfloor.",
    applications: [],
    showPerformanceMatrix: false,
    performanceRows: [],
    density: "",
    warranty: "",
    brandingTitle: "Custom Branding & Color",
    brandingDescription: "",
    showSpaceRequirements: false,
    spaceRows: [],
    caseStudiesTitle: "",
    projectsTitle: "",
    seoTitle: "",
    seoDescription: "",
    _status: "draft",
  };
}

function fromRecord(service: ServiceRecord): ServiceInput {
  const defaults = emptyService();
  return {
    ...defaults,
    title: service.title,
    slug: service.slug,
    parent: service.parent,
    excerpt: service.excerpt,
    image: service.image,
    overviewImage: service.overviewImage,
    relatedServices: service.relatedServices,
    sortOrder: service.sortOrder,
    showInMegaMenu: service.showInMegaMenu,
    detailReady: service.detailReady,
    detailTitle: service.detailTitle,
    heroTitle: service.heroTitle,
    heroDescription: service.heroDescription,
    overviewTitle: service.overviewTitle,
    overviewDescription: service.overviewDescription,
    guideTitle: service.guideTitle,
    guideDescription: service.guideDescription || defaults.guideDescription,
    applications: service.applications,
    showPerformanceMatrix: service.showPerformanceMatrix,
    performanceRows: service.performanceRows,
    density: service.density,
    warranty: service.warranty,
    brandingTitle: service.brandingTitle || defaults.brandingTitle,
    brandingDescription: service.brandingDescription,
    showSpaceRequirements: service.showSpaceRequirements,
    spaceRows: service.spaceRows,
    caseStudiesTitle: service.caseStudiesTitle,
    projectsTitle: service.projectsTitle,
    seoTitle: service.seoTitle,
    seoDescription: service.seoDescription,
    _status: service.status,
  };
}

const TAB_FIELDS: Record<Tab, string[]> = {
  Basic: ["title", "slug", "parent", "excerpt", "image"],
  Availability: ["detailReady", "showInMegaMenu", "sortOrder"],
  Hero: [
    "detailTitle",
    "heroTitle",
    "heroDescription",
    "overviewTitle",
    "overviewDescription",
    "overviewImage",
    "caseStudiesTitle",
    "projectsTitle",
  ],
  Applications: ["guideTitle", "guideDescription", "applications"],
  Performance: [
    "showPerformanceMatrix",
    "performanceRows",
    "density",
    "warranty",
    "brandingTitle",
    "brandingDescription",
  ],
  Space: ["showSpaceRequirements", "spaceRows"],
  Related: ["relatedServices"],
  SEO: ["seoTitle", "seoDescription"],
};

function tabForError(fieldErrors: Record<string, string>): Tab {
  const keys = Object.keys(fieldErrors);
  for (const tab of TABS) {
    if (keys.some((key) => TAB_FIELDS[tab].some((field) => key === field || key.startsWith(`${field}.`)))) {
      return tab;
    }
  }
  return "Basic";
}

export function ServiceForm({
  service,
  groups,
  relatedOptions,
}: {
  service?: ServiceRecord;
  groups: { id: string; title: string }[];
  relatedOptions: ServiceOption[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("Basic");
  const [values, setValues] = useState<ServiceInput>(
    service ? fromRecord(service) : emptyService()
  );
  const [slugLocked, setSlugLocked] = useState(Boolean(service?.slug));
  const [imagePreview, setImagePreview] = useState({
    url: service?.imageUrl ?? "",
    alt: service?.imageAlt ?? "",
    filename: service?.imageFilename ?? "",
    width: service?.imageWidth ?? null,
    height: service?.imageHeight ?? null,
  });
  const [overviewPreview, setOverviewPreview] = useState({
    url: service?.overviewImageUrl ?? "",
    alt: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [dirty, setDirty] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUnpublish, setConfirmUnpublish] = useState(false);
  const published = service?.status === "published";

  const generated = useMemo(() => slugify(values.title), [values.title]);

  useEffect(() => {
    const onLeave = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [dirty]);

  function update<K extends keyof ServiceInput>(key: K, value: ServiceInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  function submit(status: "draft" | "published") {
    const payload: ServiceInput = {
      ...values,
      slug: slugLocked ? values.slug : generated,
      _status: status,
    };
    start(async () => {
      setError(null);
      setErrors({});
      const result = await saveService(service?.id ?? null, payload);
      if (result?.error) setError(result.error);
      if (result?.fieldErrors) {
        setErrors(result.fieldErrors);
        setTab(tabForError(result.fieldErrors));
      }
      if (result?.href) {
        setDirty(false);
        router.push(result.href);
        router.refresh();
      }
    });
  }

  function cancel() {
    if (dirty && !window.confirm("You have unsaved changes. Leave this page?")) {
      return;
    }
    router.push("/admin/services");
  }

  return (
    <div className="space-y-6">
      <PublishStatusBanner
        status={service?.status ?? "draft"}
        kind="service"
        liveHref={
          published && (slugLocked ? values.slug : generated)
            ? `/services/${slugLocked ? values.slug : generated}`
            : undefined
        }
      />
      {service ? (
        <p className="text-sm text-muted-foreground">
          Page type: {values.detailReady ? "Full detail page" : "Coming Soon"}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-white p-1">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium",
              tab === item ? "bg-brand/10 text-brand" : "text-muted-foreground hover:text-ink"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Basic" ? (
        <div className="grid max-w-3xl gap-5">
          <Field label="Service name" htmlFor="title" error={errors.title}>
            <Input id="title" value={values.title} onChange={(e) => update("title", e.target.value)} />
          </Field>
          <Field label="URL slug" htmlFor="slug" hint="Public page: /services/your-slug" error={errors.slug}>
            <Input
              id="slug"
              value={slugLocked ? values.slug : generated}
              onChange={(e) => {
                setSlugLocked(true);
                update("slug", e.target.value);
              }}
            />
          </Field>
          <Field label="Service group" htmlFor="parent" error={errors.parent} hint="Which mega-menu column this belongs to.">
            <select
              id="parent"
              className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
              value={values.parent}
              onChange={(e) => update("parent", e.target.value)}
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Short summary" htmlFor="excerpt" error={errors.excerpt} hint="Shown on cards, search, and meta tags.">
            <Textarea
              id="excerpt"
              maxLength={300}
              value={values.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
            />
            <CharCount value={values.excerpt} max={300} />
          </Field>
          <MediaPicker
            label="Listing image"
            value={values.image ?? ""}
            previewUrl={imagePreview.url}
            previewAlt={imagePreview.alt}
            previewFilename={imagePreview.filename}
            previewWidth={imagePreview.width}
            previewHeight={imagePreview.height}
            error={errors.image}
            onChange={(next) => {
              update("image", next.id);
              setImagePreview({
                url: next.url,
                alt: next.alt,
                filename: next.filename ?? "",
                width: next.width ?? null,
                height: next.height ?? null,
              });
            }}
          />
        </div>
      ) : null}

      {tab === "Availability" ? (
        <div className="grid max-w-xl gap-4">
          <label className="flex items-start gap-3 rounded-lg border border-border p-3 text-sm">
            <Checkbox
              checked={values.detailReady}
              onChange={(e) => update("detailReady", e.target.checked)}
            />
            <span>
              <strong className="block">Full detail page</strong>
              Off = visitors see a Coming Soon page at the same URL.
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-lg border border-border p-3 text-sm">
            <Checkbox
              checked={values.showInMegaMenu}
              onChange={(e) => update("showInMegaMenu", e.target.checked)}
            />
            <span>
              <strong className="block">Show in mega menu</strong>
              Appear as a link under its service group.
            </span>
          </label>
          <Field label="Menu position" hint="Order under the group. Lower numbers appear first.">
            <Input
              type="number"
              min={0}
              value={values.sortOrder}
              onChange={(e) => update("sortOrder", Number(e.target.value) || 0)}
            />
          </Field>
        </div>
      ) : null}

      {tab === "Hero" ? (
        <div className="grid max-w-3xl gap-5">
          <Field label="Breadcrumb label" hint="Defaults to the service name.">
            <Input value={values.detailTitle ?? ""} onChange={(e) => update("detailTitle", e.target.value)} />
          </Field>
          <Field label="Page heading">
            <Input value={values.heroTitle ?? ""} onChange={(e) => update("heroTitle", e.target.value)} />
          </Field>
          <Field label="Hero description">
            <Textarea value={values.heroDescription ?? ""} onChange={(e) => update("heroDescription", e.target.value)} />
          </Field>
          <Field label="Overview title">
            <Input value={values.overviewTitle ?? ""} onChange={(e) => update("overviewTitle", e.target.value)} />
          </Field>
          <Field label="Overview description">
            <Textarea value={values.overviewDescription ?? ""} onChange={(e) => update("overviewDescription", e.target.value)} />
          </Field>
          <MediaPicker
            label="Overview image (optional)"
            value={values.overviewImage ?? ""}
            previewUrl={overviewPreview.url}
            onChange={(next) => {
              update("overviewImage", next.id);
              setOverviewPreview({ url: next.url, alt: next.alt });
            }}
          />
          <Field label="Case studies heading">
            <Input value={values.caseStudiesTitle ?? ""} onChange={(e) => update("caseStudiesTitle", e.target.value)} />
          </Field>
          <Field label="Projects heading">
            <Input value={values.projectsTitle ?? ""} onChange={(e) => update("projectsTitle", e.target.value)} />
          </Field>
        </div>
      ) : null}

      {tab === "Applications" ? (
        <div className="grid max-w-3xl gap-5">
          <Field label="Guide title">
            <Input value={values.guideTitle ?? ""} onChange={(e) => update("guideTitle", e.target.value)} />
          </Field>
          <Field label="Guide introduction">
            <Textarea value={values.guideDescription ?? ""} onChange={(e) => update("guideDescription", e.target.value)} />
          </Field>
          {values.applications.map((application, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-border p-4">
              <div className="flex justify-between gap-2">
                <p className="text-sm font-semibold">Application {index + 1}</p>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={index === 0}
                    onClick={() => {
                      const next = [...values.applications];
                      const [item] = next.splice(index, 1);
                      next.splice(index - 1, 0, item);
                      update("applications", next);
                    }}
                  >
                    Earlier
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={index === values.applications.length - 1}
                    onClick={() => {
                      const next = [...values.applications];
                      const [item] = next.splice(index, 1);
                      next.splice(index + 1, 0, item);
                      update("applications", next);
                    }}
                  >
                    Later
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      update(
                        "applications",
                        values.applications.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <Input
                placeholder="Title"
                value={application.title}
                onChange={(e) => {
                  const next = [...values.applications];
                  next[index] = { ...application, title: e.target.value };
                  update("applications", next);
                }}
              />
              <Textarea
                placeholder="Description"
                value={application.description}
                onChange={(e) => {
                  const next = [...values.applications];
                  next[index] = { ...application, description: e.target.value };
                  update("applications", next);
                }}
              />
              {application.points.map((point, pointIndex) => (
                <div key={pointIndex} className="flex gap-2">
                  <Input
                    placeholder="Point"
                    value={point.label}
                    onChange={(e) => {
                      const next = [...values.applications];
                      const points = [...application.points];
                      points[pointIndex] = { label: e.target.value };
                      next[index] = { ...application, points };
                      update("applications", next);
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      const next = [...values.applications];
                      next[index] = {
                        ...application,
                        points: application.points.filter((_, i) => i !== pointIndex),
                      };
                      update("applications", next);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const next = [...values.applications];
                  next[index] = {
                    ...application,
                    points: [...application.points, { label: "" }],
                  };
                  update("applications", next);
                }}
              >
                Add point
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              update("applications", [
                ...values.applications,
                { title: "", description: "", points: [] },
              ])
            }
          >
            <Plus className="size-4" /> Add application
          </Button>
        </div>
      ) : null}

      {tab === "Performance" ? (
        <div className="grid max-w-3xl gap-4">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={values.showPerformanceMatrix}
              onChange={(e) => update("showPerformanceMatrix", e.target.checked)}
            />
            Show the thickness & performance table
          </label>
          {values.showPerformanceMatrix ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Density">
                  <Input value={values.density ?? ""} onChange={(e) => update("density", e.target.value)} />
                </Field>
                <Field label="Warranty">
                  <Input value={values.warranty ?? ""} onChange={(e) => update("warranty", e.target.value)} />
                </Field>
              </div>
              <Field label="Branding title">
                <Input value={values.brandingTitle ?? ""} onChange={(e) => update("brandingTitle", e.target.value)} />
              </Field>
              <Field label="Branding description">
                <Textarea
                  value={values.brandingDescription ?? ""}
                  onChange={(e) => update("brandingDescription", e.target.value)}
                />
              </Field>
              <TableRows
                columns={["Use case", "Recommended", "Force reduction"]}
                rows={values.performanceRows.map((row) => [
                  row.useCase,
                  row.recommended,
                  row.forceReduction,
                ])}
                onChange={(rows) =>
                  update(
                    "performanceRows",
                    rows.map(([useCase, recommended, forceReduction]) => ({
                      useCase,
                      recommended,
                      forceReduction,
                    }))
                  )
                }
              />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Turn this on to edit the performance table.</p>
          )}
        </div>
      ) : null}

      {tab === "Space" ? (
        <div className="grid max-w-4xl gap-4">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={values.showSpaceRequirements}
              onChange={(e) => update("showSpaceRequirements", e.target.checked)}
            />
            Show the space requirements table
          </label>
          {values.showSpaceRequirements ? (
            <TableRows
              columns={["Use case", "Recommended", "Impact", "Slip", "Acoustic", "Maintenance"]}
              rows={values.spaceRows.map((row) => [
                row.useCase,
                row.recommended,
                row.impact,
                row.slip,
                row.acoustic,
                row.maintenance,
              ])}
              onChange={(rows) =>
                update(
                  "spaceRows",
                  rows.map(([useCase, recommended, impact, slip, acoustic, maintenance]) => ({
                    useCase,
                    recommended,
                    impact,
                    slip,
                    acoustic,
                    maintenance,
                  }))
                )
              }
            />
          ) : (
            <p className="text-sm text-muted-foreground">Turn this on to edit the space table.</p>
          )}
        </div>
      ) : null}

      {tab === "Related" ? (
        <div className="max-w-xl space-y-3">
          <p className="text-sm text-muted-foreground">
            Shown in “Explore Our Flooring Services”. Leave empty to auto-pick similar services.
          </p>
          {relatedOptions.map((option) => {
            const checked = values.relatedServices.includes(option.id);
            return (
              <label key={option.id} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={checked}
                  onChange={(e) => {
                    update(
                      "relatedServices",
                      e.target.checked
                        ? [...values.relatedServices, option.id]
                        : values.relatedServices.filter((id) => id !== option.id)
                    );
                  }}
                />
                {option.title}
              </label>
            );
          })}
          {relatedOptions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No other services yet.</p>
          ) : null}
        </div>
      ) : null}

      {tab === "SEO" ? (
        <div className="grid max-w-xl gap-5">
          <Field label="SEO title" hint="Overrides the service name in search results." error={errors.seoTitle}>
            <Input value={values.seoTitle ?? ""} onChange={(e) => update("seoTitle", e.target.value)} />
          </Field>
          <Field label="SEO description" error={errors.seoDescription}>
            <Textarea
              maxLength={200}
              value={values.seoDescription ?? ""}
              onChange={(e) => update("seoDescription", e.target.value)}
            />
            <CharCount value={values.seoDescription ?? ""} max={200} />
          </Field>
        </div>
      ) : null}

      {confirmUnpublish ? (
        <div className="max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <p className="font-medium">Unpublish this service?</p>
          <p className="mt-1">
            This will hide the public page until you publish it again.
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant="secondary"
              disabled={pending}
              onClick={() => {
                setConfirmUnpublish(false);
                submit("draft");
              }}
            >
              Unpublish
            </Button>
            <Button type="button" variant="ghost" onClick={() => setConfirmUnpublish(false)}>
              Keep published
            </Button>
          </div>
        </div>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex flex-wrap gap-2 border-t border-border pt-5">
        {published ? (
          <Button type="button" variant="outline" disabled={pending} onClick={() => submit("published")}>
            {pending ? "Saving…" : "Save changes"}
          </Button>
        ) : (
          <Button type="button" variant="outline" disabled={pending} onClick={() => submit("draft")}>
            {pending ? "Saving…" : "Save draft"}
          </Button>
        )}
        <Button type="button" disabled={pending} onClick={() => submit("published")}>
          {pending ? "Saving…" : published ? "Update published" : "Publish"}
        </Button>
        {published ? (
          <Button
            type="button"
            variant="secondary"
            disabled={pending}
            onClick={() => setConfirmUnpublish(true)}
          >
            Unpublish
          </Button>
        ) : null}
        <Button type="button" variant="ghost" onClick={cancel}>
          Cancel
        </Button>
      </div>

      {service ? (
        <div>
          {confirmDelete ? (
            <div className="max-w-xl rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <p className="text-sm font-medium">Delete this service?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The public page will stop working. Images are kept in Media.
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      const result = await deleteService(service.id);
                      if (result?.error) setError(result.error);
                      if (result?.href) {
                        setDirty(false);
                        router.push(result.href);
                        router.refresh();
                      }
                    })
                  }
                >
                  Delete service
                </Button>
                <Button type="button" variant="ghost" onClick={() => setConfirmDelete(false)}>
                  Keep service
                </Button>
              </div>
            </div>
          ) : (
            <Button type="button" variant="ghost" className="text-destructive" onClick={() => setConfirmDelete(true)}>
              Delete service
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function TableRows({
  columns,
  rows,
  onChange,
}: {
  columns: string[];
  rows: string[][];
  onChange: (rows: string[][]) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} className="bg-muted/60 px-2 py-2 text-left text-xs">
                  {column}
                </th>
              ))}
              <th className="bg-muted/60" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-2 py-1">
                    <Input
                      value={cell}
                      onChange={(event) => {
                        const next = rows.map((item) => [...item]);
                        next[index][cellIndex] = event.target.value;
                        onChange(next);
                      }}
                    />
                  </td>
                ))}
                <td>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onChange(rows.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...rows, columns.map(() => "")])}
      >
        Add row
      </Button>
    </div>
  );
}
