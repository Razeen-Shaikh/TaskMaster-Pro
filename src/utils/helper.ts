import { isToday, isSameDay, addDays, format } from "date-fns";

/**
 * Formats a date into a display string.
 * If the date is today or tomorrow, it shows "Today" or "Tomorrow".
 * Otherwise, it returns the date in "dd MMM, yyyy" format.
 */
export function formatDisplayDate(date: Date): string {
  if (isToday(date)) {
    return "Today";
  }
  if (isSameDay(date, addDays(new Date(), 1))) {
    return "Tomorrow";
  }
  return format(date, "dd MMM, yyyy");
}

/**
 * Updates the active text formatting state based on the current text selection.
 * It looks for bold, italic, strikethrough, unordered list, and ordered list in the current selection.
 */
export const detectFormatting = (
  setActiveFormats: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  let parentNode = range.commonAncestorContainer as HTMLElement;

  while (parentNode && parentNode.tagName !== "DIV") {
    parentNode = parentNode.parentElement as HTMLElement;
  }

  setActiveFormats({
    b: !!parentNode.closest("b"),
    i: !!parentNode.closest("i"),
    s: !!parentNode.closest("s"),
    ul: !!parentNode.closest("ul"),
    ol: !!parentNode.closest("ol"),
  });
};

/**
 * Applies or removes a given HTML tag from the selected text.
 * It toggles the formatting by wrapping or unwrapping the selected text.
 */
export const formatText = (tag: string, detectFormatting: () => void) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.toString();

  if (selectedText) {
    const existingTag =
      range.commonAncestorContainer.parentElement?.closest(tag);
    if (existingTag) {
      const parent = existingTag.parentNode as HTMLElement;
      while (existingTag.firstChild) {
        parent.insertBefore(existingTag.firstChild, existingTag);
      }
      parent.removeChild(existingTag);
    } else {
      const newNode = document.createElement(tag);
      newNode.textContent = selectedText;
      range.deleteContents();
      range.insertNode(newNode);
    }
    detectFormatting();
  }
  (document.activeElement as HTMLElement)?.blur();
};

/**
 * Inserts or toggles an ordered or unordered list at the current selection.
 *
 * If the selection is inside a list item (<li>):
 *   - If the list type matches the requested one, it will remove the list (unwrap into paragraphs).
 *   - If the list type is different, it will convert the list to the requested type.
 *
 * If the selection is not inside a list:
 *   - It creates a new list at the current cursor position with one list item containing a non-breaking space.
 *
 * @param isOrdered - True for an ordered list (<ol>), false for an unordered list (<ul>).
 * @param updateFormatting - Callback to update the UI formatting state.
 */
export const insertList = (
  isOrdered: boolean,
  updateFormatting: () => void
) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  let listItemElement = range.commonAncestorContainer as HTMLElement;

  while (
    listItemElement &&
    listItemElement.tagName !== "LI" &&
    listItemElement.tagName !== "DIV"
  ) {
    listItemElement = listItemElement.parentElement as HTMLElement;
  }

  if (listItemElement) {
    const parentListElement = listItemElement.parentElement as HTMLElement;

    if (
      parentListElement &&
      (parentListElement.tagName === "OL" || parentListElement.tagName === "UL")
    ) {
      if (
        (isOrdered && parentListElement.tagName === "OL") ||
        (!isOrdered && parentListElement.tagName === "UL")
      ) {
        const documentFragment = document.createDocumentFragment();

        while (parentListElement.firstChild) {
          const listItem = parentListElement.firstChild as HTMLElement;
          if (listItem.tagName === "LI") {
            const paragraphElement = document.createElement("p");
            paragraphElement.innerHTML = listItem.innerHTML;
            documentFragment.appendChild(paragraphElement);
          }
          parentListElement.removeChild(listItem);
        }
        parentListElement.replaceWith(documentFragment);
        updateFormatting();
        return;
      }

      const newListElement = document.createElement(isOrdered ? "ol" : "ul");
      while (parentListElement.firstChild) {
        newListElement.appendChild(parentListElement.firstChild);
      }
      parentListElement.replaceWith(newListElement);
      updateFormatting();
      return;
    }
  }

  const listElement = document.createElement(isOrdered ? "ol" : "ul");
  listElement.style.paddingLeft = "20px";

  const newListItem = document.createElement("li");
  newListItem.textContent = "\u00A0";
  listElement.appendChild(newListItem);

  range.insertNode(listElement);

  updateFormatting();
};
