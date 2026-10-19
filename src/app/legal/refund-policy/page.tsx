import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { legalDocs } from "@/config/legal";

const doc = legalDocs["refund-policy"];

export const metadata: Metadata = { title: `${doc.title} (Draft)`, description: doc.description, robots: { index: false } };

export default function Page() {
  return <LegalDocument doc={doc} />;
}
