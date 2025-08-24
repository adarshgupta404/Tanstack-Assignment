import { columns } from "@/components/tables/pupils/pupils-columns";
import { PupilsDataTable } from "@/components/tables/pupils/pupils-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <section className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Pupils Dashboard</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pupils</CardTitle>
          <CardDescription>
            A comprehensive list of all registered pupils with their details and
            progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PupilsDataTable columns={columns} />
        </CardContent>
      </Card>
    </section>
  );
}
