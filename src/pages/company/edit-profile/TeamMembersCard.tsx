
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeamMember } from "../components/types";

interface TeamMembersCardProps {
  teamMembers: TeamMember[];
  handleTeamMemberChange: (index: number, field: 'name' | 'position', value: string) => void;
}

const TeamMembersCard = ({ teamMembers, handleTeamMemberChange }: TeamMembersCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5" /> 
          Equipe de Liderança
        </CardTitle>
        <CardDescription>
          Integrantes chave da equipe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-md">
              <div className="space-y-2">
                <Label htmlFor={`team-name-${index}`}>Nome</Label>
                <Input 
                  id={`team-name-${index}`} 
                  value={member.name} 
                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`team-position-${index}`}>Cargo</Label>
                <Input 
                  id={`team-position-${index}`} 
                  value={member.position} 
                  onChange={(e) => handleTeamMemberChange(index, 'position', e.target.value)} 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembersCard;

