
import MainLayout from "@/components/layout/MainLayout";
import { companies } from "@/data/companies";
import EditProfileHeader from "./edit-profile/EditProfileHeader";
import EditProfileForm from "./edit-profile/EditProfileForm";
import { useEditProfileForm } from "./edit-profile/useEditProfileForm";

// Use the first company as example data (in a real app, this would be fetched based on the logged in user)
const companyData = { ...companies[0] };

const EditProfile = () => {
  const initialFormData = {
    name: companyData.name,
    industry: companyData.industry,
    description: companyData.description,
    foundedYear: companyData.foundedYear,
    location: companyData.location,
    employees: companyData.employees,
    valuation: companyData.valuation / 1000000, // Convert to millions for easier editing
    growth: companyData.growth,
    website: companyData.website,
    // Team members
    team: companyData.team.map(member => ({
      name: member.name,
      position: member.position,
    })),
    // Highlights
    highlights: companyData.highlights.join('\n'),
  };

  const { 
    formData, 
    handleInputChange, 
    handleTeamMemberChange, 
    handleSubmit 
  } = useEditProfileForm(initialFormData);

  return (
    <MainLayout>
      <div className="container py-8">
        <EditProfileHeader />
        
        <EditProfileForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleTeamMemberChange={handleTeamMemberChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  );
};

export default EditProfile;

