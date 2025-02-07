import { isToday, isSameDay, addDays, format } from "date-fns";

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
 *
 * This function checks if the selected text is within certain HTML elements
 * (bold, italic, strikethrough, unordered list, ordered list) and updates
 * the `setActiveFormats` state accordingly. It is used to determine which
 * formatting options are currently applied to the text within a text editor.
 *
 * @param setActiveFormats - A React state setter function that updates
 * the active formatting state object, indicating which formatting tags
 * (b, i, s, ul, ol) are currently active within the selected text.
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
 * Applies or removes a given HTML tag from the selected text within a text
 * editor.
 *
 * This function takes a tag name (e.g. "b", "i", "s", "ul", "ol") and a
 * function to detect the current formatting state. It checks if the selected
 * text is already within the given tag, and if so, removes the tag; otherwise,
 * it wraps the selected text in a new tag. It then updates the formatting state
 * using the provided function and blurs the current element.
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
      while (existingTag.firstChild)
        parent.insertBefore(existingTag.firstChild, existingTag);
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
 * Inserts an ordered or unordered list into the text editor, depending on the
 * selection position. If the selection is inside a list item, it replaces the
 * parent list with paragraphs. If the selection is not inside a list, it creates
 * a new list with a single list item containing a non-breaking space.
 * @param {boolean} isOrdered - True for an ordered list (OL), false for an unordered list (UL)
 * @param {() => void} updateFormatting - A function to update the UI based on changes to the text formatting
 */

export const insertList = (
  isOrdered: boolean,
  updateFormatting: () => void
) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  let listItemElement = range.commonAncestorContainer as HTMLElement;

  while (listItemElement && listItemElement.tagName !== "LI") {
    listItemElement = listItemElement.parentElement as HTMLElement;
  }

  if (listItemElement) {
    const parentListElement = listItemElement.parentElement as HTMLElement;

    if (
      parentListElement &&
      (parentListElement.tagName === "OL" || parentListElement.tagName === "UL")
    ) {
      // Remove list only if it matches the active type
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
        return; // Exit after removal
      }

      // If toggling between OL and UL, convert instead of removing
      const newListElement = document.createElement(isOrdered ? "ol" : "ul");
      while (parentListElement.firstChild) {
        newListElement.appendChild(parentListElement.firstChild);
      }
      parentListElement.replaceWith(newListElement);
      updateFormatting();
      return;
    }
  }

  // If not inside a list, create a new list
  const listElement = document.createElement(isOrdered ? "ol" : "ul");
  listElement.style.paddingLeft = "20px";

  const newListItem = document.createElement("li");
  newListItem.textContent = "\u00A0"; // Non-breaking space placeholder
  listElement.appendChild(newListItem);
  range.insertNode(listElement);

  updateFormatting();
};
