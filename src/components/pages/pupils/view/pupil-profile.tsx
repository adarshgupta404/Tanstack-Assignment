import { pupilsApi } from "@/api/pupilsApi";
import { DeleteModal } from "@/components/models/DeleteModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoadingStore } from "@/context/loading";
import { getOpenCloseModel } from "@/context/model";
import { userKeys } from "@/hooks/queryOptions/pupils";
import type { PupilSchemaType } from "@/types/validator/pupils";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  Car,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Trash,
  User,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

interface PupilProfileProps {
  pupil: PupilSchemaType;
}

export default function PupilProfile({ pupil }: PupilProfileProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { isOpen, open, close } = getOpenCloseModel();
  const { isLoading, setLoading } = getLoadingStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const data = await pupilsApi.deleteById(id);

      queryClient.removeQueries({
        queryKey: userKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });

      if (data.success) {
        toast.success(`Pupil ${pupil.forename} deleted successfully`);
        navigate({ to: "/pupils" });
      } else {
        toast.error(data.error.message || `Failed to delete pupil ${pupil.forename}`);
      }
    } catch (error) {
      toast.error(`Failed to delete pupil ${pupil.forename}`);
    } finally {
      close();
      setLoading(false);
    }
  };

  return (
    <section className="">
      <Card className="border-0 shadow-lg pt-0 mb-6">
        <CardContent className="">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage
                src={`/professional-headshot.png?height=96&width=96&query=professional+headshot+${pupil.forename}+${pupil.surname}`}
              />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                {getInitials(pupil.forename + " " + pupil.surname)}
              </AvatarFallback>
            </Avatar>
            <DeleteModal
              open={isOpen}
              onClose={close}
              onConfirm={() => handleDelete(pupil._id)}
              loading={isLoading}
              title="Delete Pupil"
              description={`Are you sure you want to delete ${pupil.forename}? This action cannot be undone.`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between w-full">
                <h1 className="text-4xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)] mb-2">
                  {pupil.fullName
                    ? pupil.fullName
                    : `${pupil.forename} ${pupil.surname}`}
                </h1>
                <Button
                  className="cursor-pointer"
                  onClick={open}
                  variant={"destructive"}
                >
                  <Trash />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge
                  variant="secondary"
                  className="text-sm bg-green-700 text-primary-foreground dark:text-primary"
                >
                  <Car className="w-4 h-4 mr-1" />
                  {pupil.pupilType}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <FileText className="w-4 h-4 mr-1" />
                  {pupil.licenseType}
                </Badge>
                {pupil.passedTheory && (
                  <Badge className="bg-green-700/80 text-primary-foreground dark:text-primary text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Theory Passed
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-lg">
                Age {pupil.age} • {pupil.gender}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
              <User className="w-5 h-5 text-green-700/80" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5" />
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{formatDate(pupil.dob)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{pupil.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Mobile</p>
                <p className="font-medium">{pupil?.home?.mobile}</p>
              </div>
            </div>
            {pupil?.home?.work && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Work Phone</p>
                  <p className="font-medium">{pupil.home.work}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
              <MapPin className="w-5 h-5 text-green-700/80" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Home Address</p>
              <p className="font-medium">
                {pupil?.homeAddress?.houseNo} {pupil?.homeAddress?.address}
              </p>
              <p className="text-sm text-muted-foreground">
                {pupil?.homeAddress?.postcode}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Pickup Address
              </p>
              <p className="font-medium">
                {pupil?.pickupAddress?.houseNo} {pupil?.pickupAddress?.address}
              </p>
              <p className="text-sm text-muted-foreground">
                {pupil?.pickupAddress?.postcode}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
              <FileText className="w-5 h-5 text-green-700/80" />
              License Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">License Number</p>
              <p className="font-medium font-mono text-lg">{pupil.licenseNo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">License Type</p>
              <p className="font-medium">{pupil.licenseType}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Theory Test:</p>
              {pupil.passedTheory ? (
                <div className="flex items-center gap-1 text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Passed</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <XCircle className="w-4 h-4" />
                  <span>Not Passed</span>
                </div>
              )}
            </div>
            {pupil.certNo && (
              <div>
                <p className="text-sm text-muted-foreground">
                  Certificate Number
                </p>
                <p className="font-medium font-mono">{pupil.certNo}</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
              <Clock className="w-5 h-5 text-green-700/80" />
              Lesson Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Usual Availability
              </p>
              <p className="font-medium">{pupil.usualAvailability}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Text Messaging</p>
              <div className="flex items-center gap-1">
                {pupil.allowTextMessaging ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">Allowed</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Not Allowed</span>
                  </>
                )}
              </div>
            </div>
            {pupil.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium">{pupil.notes}</p>
              </div>
            )}
            {pupil?.createdAt && (
              <div>
                <p className="text-sm text-muted-foreground">Student Since</p>
                <p className="font-medium">{formatDate(pupil.createdAt)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
