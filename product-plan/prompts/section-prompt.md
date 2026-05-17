# Section Implementation Prompt

## Define Section Variables Before Using

- **SECTION_NAME** = [Human-readable name, e.g., "Donor Browse & Connect"]
- **SECTION_ID** = [Folder name in sections/, e.g., "donor-browse-and-connect"]
- **NN** = [Milestone number, e.g., "04" — sections start at 02 since 01 is Shell]

---

I need you to implement the **SECTION_NAME** section of my application.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** — Product summary for overall context
2. **@product-plan/instructions/incremental/NN-SECTION_ID.md** — Specific instructions for this section

Also review the section assets:
- **@product-plan/sections/SECTION_ID/README.md** — Feature overview and design intent
- **@product-plan/sections/SECTION_ID/tests.md** — UI behavior test specs
- **@product-plan/sections/SECTION_ID/components/** — React components to integrate
- **@product-plan/sections/SECTION_ID/types.ts** — TypeScript interfaces
- **@product-plan/sections/SECTION_ID/sample-data.json** — Sample test data

## Before You Begin

Review all the provided files, then ask me clarifying questions about:

1. **Integration** — How this section connects to existing features, routes, and APIs already built
2. **Backend data** — How to fetch/store the data this section needs
3. **Product requirements** — Anything in the specs or user flows that needs clarification
4. **Anything else** — Whatever you need to know before implementing

Lastly, ask me if I have any additional notes for this implementation.

Once I answer your questions, proceed with implementation.
