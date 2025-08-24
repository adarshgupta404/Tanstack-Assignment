import { sortingFns, type FilterFn } from "@tanstack/react-table";

const globalPupilFilterFn: FilterFn<any> = (row, _columnId, filterValue) => {
  const pupil = row.original;
  const fullName = `${pupil.forename} ${pupil.surname}`.toLowerCase();
  const licenseType = pupil.licenseType?.toLowerCase() ?? "";
  const email = pupil.email?.toLowerCase() ?? "";
  const search = filterValue.toLowerCase();

  return (
    fullName.includes(search) ||
    licenseType.includes(search) ||
    email.includes(search)
  );
};

const newSortingFns = {
  ...sortingFns,
  alphanumeric: (rowA: any, rowB: any, columnId: string) => {
    const a = rowA.getValue(columnId);
    const b = rowB.getValue(columnId);

    // Handle null/undefined values
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    // Convert to strings and compare case-insensitively
    const aStr = String(a).toLowerCase();
    const bStr = String(b).toLowerCase();

    return aStr.localeCompare(bStr);
  },

  // Custom numeric sorting function
  numeric: (rowA: any, rowB: any, columnId: string) => {
    const a = rowA.getValue(columnId);
    const b = rowB.getValue(columnId);

    // Handle null/undefined values
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    // Convert to numbers
    const aNum = Number(a);
    const bNum = Number(b);

    // Handle NaN values
    if (isNaN(aNum) && isNaN(bNum)) return 0;
    if (isNaN(aNum)) return 1;
    if (isNaN(bNum)) return -1;

    return aNum - bNum;
  },

  // Custom date sorting function
  datetime: (rowA: any, rowB: any, columnId: string) => {
    const a = rowA.getValue(columnId);
    const b = rowB.getValue(columnId);

    // Handle null/undefined values
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    // Convert to dates
    const aDate = new Date(a);
    const bDate = new Date(b);

    // Handle invalid dates
    if (isNaN(aDate.getTime()) && isNaN(bDate.getTime())) return 0;
    if (isNaN(aDate.getTime())) return 1;
    if (isNaN(bDate.getTime())) return -1;

    return aDate.getTime() - bDate.getTime();
  },
};

export { globalPupilFilterFn, newSortingFns };
