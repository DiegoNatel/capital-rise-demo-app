
import { OfferWithCompany } from "./OfferCard";
import OffersGrid from "./OffersGrid";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface OffersTabsProps {
  filteredOffers: OfferWithCompany[];
}

const OffersTabs = ({ filteredOffers }: OffersTabsProps) => {
  const tabValues = ["all", "active", "upcoming", "completed"] as const;
  
  return (
    <Tabs defaultValue="all" className="space-y-8">
      <TabsList className="grid grid-cols-4 w-full max-w-md">
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="active">Ativas</TabsTrigger>
        <TabsTrigger value="upcoming">Em breve</TabsTrigger>
        <TabsTrigger value="completed">Concluídas</TabsTrigger>
      </TabsList>
      
      {tabValues.map((tabValue) => (
        <TabsContent key={tabValue} value={tabValue} className="space-y-6">
          <OffersGrid
            offers={filteredOffers.filter(
              (offer) => tabValue === "all" || offer.status === tabValue
            )}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default OffersTabs;
