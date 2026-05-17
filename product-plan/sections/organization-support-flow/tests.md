# Test Specs: Organization Support Flow

Framework-agnostic UI behavior specs. Adapt to your testing setup.

---

## User Flow Tests

### Flow 1: Open the Partnership Modal

**Scenario:** Organization representative clicks the floating button.

**Steps:**
1. Render `PartnershipWidget` with support types and content
2. User sees a floating blue pill button in the bottom-right corner
3. User clicks the button

**Expected Results:**
- [ ] Partnership modal opens
- [ ] Modal shows the headline from `content.modalHeadline`
- [ ] Register tab with the partnership form is visible
- [ ] Backdrop blur is applied behind the modal

---

### Flow 2: Submit Partnership Inquiry

**Scenario:** Organization fills out and submits the form.

**Steps:**
1. Modal is open
2. User enters organization name: "Фонд Здоров'я"
3. User enters contact person: "Олег Марченко"
4. User enters email: "o.marchenko@fund.org"
5. User selects support types: "Medical care", "Psychological support"
6. User enters a message
7. User clicks "Send inquiry"

**Expected Results:**
- [ ] `onSubmit` called with `{ orgName, contactPerson, email, supportTypeIds, message }`
- [ ] Success state shown (green checkmark + `content.successHeadline`)
- [ ] Form is replaced with success message
- [ ] `content.successBody` visible

#### Failure Path: Required Fields Empty

- [ ] Submit button disabled when `orgName`, `contactPerson`, or `email` is empty
- [ ] No callback fired when button is disabled

---

### Flow 3: Close the Modal

**Scenario:** User closes the modal after submitting.

**Steps:**
1. Success state is visible
2. User clicks the close button (labeled `content.successClose`)

**Expected Results:**
- [ ] Modal closes
- [ ] After close, modal state is reset (form fields cleared, back to initial state)
- [ ] Floating button is visible again

---

## Component Interaction Tests

### Floating Button

- [ ] Button is fixed in the bottom-right corner (`position: fixed`)
- [ ] Button shows the label from `content.buttonLabel`
- [ ] Pulse animation ring is visible around the button

### Partnership Form

- [ ] Support type chips render for every item in `supportTypes`
- [ ] Clicking a chip toggles its selected state
- [ ] Selected chip shows a "✓" and uses blue fill
- [ ] Multiple chips can be selected simultaneously
- [ ] Deselecting a chip removes it from the selection

### Modal Close Behavior

- [ ] Clicking the × button closes the modal
- [ ] Clicking the backdrop (outside the modal) closes the modal
- [ ] Clicking inside the modal does not close it

---

## Empty States

- [ ] No support types selected: form can still be submitted (selection is optional)
- [ ] Empty message field: form can still be submitted (message is optional)

---

## Edge Cases

- [ ] Modal is full-screen / nearly full-screen on 375px mobile viewport
- [ ] Very long organization name doesn't overflow the input or header
- [ ] After closing and reopening, form is empty (state reset)

---

## Sample Test Data

```typescript
const mockSupportTypes = [
  { id: 'food',      label: { uk: 'Продукти',   en: 'Food & groceries' } },
  { id: 'medical',   label: { uk: 'Медицина',   en: 'Medical care' } },
  { id: 'clothing',  label: { uk: 'Одяг',       en: 'Clothing' } },
]

const mockContent = {
  buttonLabel:        { uk: 'Стати партнером',     en: 'Become a partner' },
  modalHeadline:      { uk: 'Разом ми можемо більше', en: 'Together we can do more' },
  modalSubheadline:   { uk: 'Опис партнерства.',   en: 'Partnership description.' },
  orgNameLabel:       { uk: 'Організація',         en: 'Organization name' },
  contactLabel:       { uk: 'Контакт',             en: 'Contact person' },
  emailLabel:         { uk: 'Email',               en: 'Email address' },
  supportTypeLabel:   { uk: 'Підтримка',           en: 'What can you offer?' },
  messageLabel:       { uk: 'Повідомлення',        en: 'Tell us more' },
  messagePlaceholder: { uk: 'Опишіть...',          en: 'Describe...' },
  submitLabel:        { uk: 'Надіслати',           en: 'Send inquiry' },
  successHeadline:    { uk: 'Дякуємо!',            en: 'Thank you!' },
  successBody:        { uk: 'Ми зв\'яжемось.',     en: 'We\'ll be in touch.' },
  successClose:       { uk: 'Закрити',             en: 'Close' },
}
```
