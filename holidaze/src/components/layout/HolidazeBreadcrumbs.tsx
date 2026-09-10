// src/components/layout/Breadcrumbs.tsx
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/vendor/breadcrumb";

type BreadcrumbEntry = {
  label: string;
  href?: string; // omit on the current/last page
};

type BreadcrumbsProps = {
  items: BreadcrumbEntry[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <BreadcrumbItem key={item.label}>
              {isLast || !item.href ? (
                <BreadcrumbPage>
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
