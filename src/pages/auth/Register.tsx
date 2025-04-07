
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call for demo purposes
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registro realizado com sucesso",
        description: "Sua conta foi criada. Bem-vindo à plataforma CapitalRise!",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
            <CardDescription className="text-center">
              Escolha o tipo de conta e informe seus dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="investor" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="investor">Investidor</TabsTrigger>
                <TabsTrigger value="company">Empresa</TabsTrigger>
              </TabsList>
              
              <TabsContent value="investor">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seunome@exemplo.com" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" type="tel" placeholder="(11) 98765-4321" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="investorPassword">Senha</Label>
                      <div className="relative">
                        <Input
                          id="investorPassword"
                          type={showPassword ? "text" : "password"}
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">
                        A senha deve ter no mínimo 8 caracteres, incluindo letras, números e símbolos
                      </p>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Tipo de investidor</Label>
                      <RadioGroup defaultValue="individual">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="individual" id="individual" />
                          <Label htmlFor="individual" className="font-normal">Pessoa Física</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="institutional" id="institutional" />
                          <Label htmlFor="institutional" className="font-normal">Pessoa Jurídica / Institucional</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                        required
                      />
                      <Label htmlFor="terms" className="text-sm font-normal">
                        Eu li e concordo com os <Link to="/terms" className="text-blue-500 hover:text-blue-600">Termos de Serviço</Link> e <Link to="/privacy" className="text-blue-500 hover:text-blue-600">Política de Privacidade</Link>
                      </Label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white mt-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Criando conta..." : "Criar Conta"}
                      {!isLoading && <CheckCircle className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="company">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input id="companyName" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" placeholder="00.000.000/0000-00" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="companyEmail">Email Corporativo</Label>
                      <Input id="companyEmail" type="email" placeholder="contato@suaempresa.com.br" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="companyPhone">Telefone Comercial</Label>
                      <Input id="companyPhone" type="tel" placeholder="(11) 3456-7890" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="contactName">Nome do Responsável</Label>
                        <Input id="contactName" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contactPosition">Cargo</Label>
                        <Input id="contactPosition" required />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="companyPassword">Senha</Label>
                      <div className="relative">
                        <Input
                          id="companyPassword"
                          type={showPassword ? "text" : "password"}
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleShowPassword}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-500">
                        A senha deve ter no mínimo 8 caracteres, incluindo letras, números e símbolos
                      </p>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Tipo de empresa</Label>
                      <RadioGroup defaultValue="startup">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="startup" id="startup" />
                          <Label htmlFor="startup" className="font-normal">Startup / Empresa Inovadora</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="established" id="established" />
                          <Label htmlFor="established" className="font-normal">Empresa Estabelecida</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="termsCompany" 
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                        required
                      />
                      <Label htmlFor="termsCompany" className="text-sm font-normal">
                        Eu li e concordo com os <Link to="/terms" className="text-blue-500 hover:text-blue-600">Termos de Serviço</Link> e <Link to="/privacy" className="text-blue-500 hover:text-blue-600">Política de Privacidade</Link>
                      </Label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white mt-2"
                      disabled={isLoading}
                    >
                      {isLoading ? "Criando conta..." : "Criar Conta"}
                      {!isLoading && <CheckCircle className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;
