
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EditProfileFormData } from "./types";

export const useEditProfileForm = (initialData: EditProfileFormData) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EditProfileFormData>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamMemberChange = (index: number, field: 'name' | 'position', value: string) => {
    setFormData(prev => {
      const updatedTeam = [...prev.team];
      updatedTeam[index] = {
        ...updatedTeam[index],
        [field]: value
      };
      return {
        ...prev,
        team: updatedTeam
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log("Saving company profile:", formData);
    
    // Show success message
    toast.success("Perfil da empresa atualizado com sucesso");
    
    // Navigate back to company portal
    navigate("/company");
  };

  return {
    formData,
    handleInputChange,
    handleTeamMemberChange,
    handleSubmit
  };
};

