import { pupilsApi } from "@/api/pupilsApi";
import { DeleteModal } from "@/components/models/DeleteModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLoadingStore } from "@/context/loading";
import { getOpenCloseModel } from "@/context/model";
import {
  createPupilDetailQueryOptions,
  userKeys,
} from "@/hooks/queryOptions/pupils";
import type { PupilSchemaType } from "@/types/validator/pupils";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ActionsCell({ pupil }: { pupil: PupilSchemaType }) {
  const queryClient = useQueryClient();
  const { isOpen, open, close } = getOpenCloseModel();
  const { isLoading, setLoading } = getLoadingStore();
  const [selectedPupil, setSelectedPupil] = useState<PupilSchemaType | null>(
    null
  );

  const handleDelete = async () => {
    if (!selectedPupil) return;
    try {
      setLoading(true);
      const data = await pupilsApi.deleteById(selectedPupil._id);
      console.log(data);
      if (data.success === true) {
        toast.success(`Pupil ${data.data.fullName} deleted successfully!`);
        queryClient.removeQueries({
          queryKey: userKeys.detail(selectedPupil._id),
        });
      } else {
        toast.error(
          data.error.message ||
            `Failed to delete pupil ${selectedPupil.forename}`
        );
      }
    } catch (error) {
      toast.error(`Failed to delete pupil ${selectedPupil.forename}`);
    } finally {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      setLoading(false);
      setSelectedPupil(null);
      close();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(pupil._id)}
          >
            Copy pupil ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              className="flex items-center gap-2"
              to={`/pupils/$id`}
              params={{ id: pupil._id }}
              onMouseEnter={() => {
                queryClient.prefetchQuery(
                  createPupilDetailQueryOptions(pupil._id)
                );
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View pupil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="flex items-center gap-2"
              to={`/pupils/$id/edit`}
              params={{ id: pupil._id }}
              onMouseEnter={() => {
                queryClient.prefetchQuery(
                  createPupilDetailQueryOptions(pupil._id)
                );
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit pupil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive cursor-pointer"
            onClick={() => {
              setSelectedPupil(pupil);
              open();
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete pupil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedPupil && (
        <DeleteModal
          open={isOpen}
          onClose={close}
          onConfirm={handleDelete}
          loading={isLoading}
          title="Delete Pupil"
          description={`Are you sure you want to delete ${selectedPupil.forename}? This action cannot be undone.`}
        />
      )}
    </>
  );
}

export const columns: ColumnDef<PupilSchemaType>[] = [
  {
    id: "fullName",
    sortingFn: "alphanumeric",
    header: "Name",
    accessorFn: (row) => `${row.forename} ${row.surname}`,
    cell: ({ row }) => {
      const pupil = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {pupil.forename} {pupil.surname}
          </span>
          <span className="text-sm text-muted-foreground">{pupil.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "licenseType",
    header: "License Type",
    cell: ({ row }) => {
      const licenseType = row.getValue("licenseType") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {licenseType}
        </Badge>
      );
    },
  },
  {
    id: "age",
    header: "Age (in yrs)",
    accessorFn: (row) => {
      const dob = new Date(row.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const hasBirthdayPassed =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() &&
          today.getDate() >= dob.getDate());

      if (!hasBirthdayPassed) age--;

      return age;
    },
    //@ts-ignore
    sortingFn: "numeric",
    cell: ({ row }) => <span>{row.getValue("age")}</span>,
  },

  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original.gender;
      return gender || "N/A";
    },
  },
  {
    accessorKey: "home.mobile",
    header: "Mobile",
    cell: ({ row }) => {
      const mobile = row.original.home?.mobile;
      return mobile || "N/A";
    },
  },
  {
    accessorKey: "pupilOwner",
    header: "Pupil Owner",
    cell: ({ row }) => {
      const owner = row.getValue("pupilOwner") as string;
      return owner || "Unassigned";
    },
  },
  {
    accessorKey: "passedTheory",
    header: "Theory",
    cell: ({ row }) => {
      const passed = row.getValue("passedTheory") as boolean;
      return (
        <Badge variant={passed ? "default" : "secondary"}>
          {passed ? "Passed" : "Pending"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell pupil={row.original} />,
  },
];
