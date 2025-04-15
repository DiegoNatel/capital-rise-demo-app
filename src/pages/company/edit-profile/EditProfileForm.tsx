
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BasicInformationCard from "./BasicInformationCard";
import TeamMembersCard from "./TeamMembersCard";
import { EditProfileFormData } from "./types";

interface EditProfileFormProps {
  formData: EditProfileFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleTeamMemberChange: (index: number, field: 'name' | 'position', value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const EditProfileForm = ({ 
  formData, 
  handleInputChange, 
  handleTeamMemberChange, 
  handleSubmit 
}: EditProfileFormProps) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <BasicInformationCard formData={formData} handleInputChange={handleInputChange} />

      {/* Team Members */}
      <TeamMembersCard teamMembers={formData.team} handleTeamMemberChange={handleTeamMemberChange} />

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/company")}
        >
          Cancelar
        </Button>
        <Button type="submit" className="flex items-center">
          <Save className="mr-2 h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;

