
import { ArrowRight, BarChart3, Building, Users, Shield, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { offersWithCompanyData } from "@/data/offers";

const featuredOffers = offersWithCompanyData.filter(offer => 
  offer.status === 'active'
).slice(0, 2);

const HomePage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-50/50 to-brand-green-50/50 dark:from-slate-900 dark:to-slate-800" />
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(to_bottom,transparent,black)]" style={{ backgroundSize: '30px 30px' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="block">Revolucione a</span>
              <span className="block mt-1 bg-gradient-to-r from-brand-blue-500 to-brand-green-500 bg-clip-text text-transparent">
                Captação de Capital
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
              Plataforma blockchain para captação de capital que conecta empresas a investidores,
              democratizando o acesso ao financiamento.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/company">
                <Button className="w-full sm:w-auto px-8 py-6 bg-brand-blue-500 hover:bg-brand-blue-600 text-lg">
                  Para Empresas
                </Button>
              </Link>
              <Link to="/investor">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg">
                  Para Investidores
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Uma nova maneira de captar e investir
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Nossa plataforma oferece soluções completas para empresas e investidores.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center">
                <Building className="h-6 w-6 text-brand-blue-500" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Para Empresas</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Tokenize seus ativos e capte recursos de forma eficiente, 
                transparente e com alcance global.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-brand-green-100 dark:bg-brand-green-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-brand-green-500" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Para Investidores</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Acesse oportunidades de investimento em empresas inovadoras com
                valores acessíveis e liquidez garantida.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-brand-blue-500" />
              </div>
              <h3 className="mt-6 text-xl font-medium">Marketplace</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Compre e venda tokens com facilidade em nosso marketplace
                integrado com liquidez e segurança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Como Funciona</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Um processo simples e transparente para empresas e investidores
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Process steps */}
              <div className="hidden lg:block absolute left-1/2 w-0.5 h-full bg-slate-200 dark:bg-slate-700" />
              
              <div className="space-y-12 lg:space-y-0">
                {/* Step 1 */}
                <div className="relative lg:flex">
                  <div className="hidden lg:block absolute top-0 left-1/2 -ml-0.5">
                    <div className="h-8 w-8 rounded-full bg-brand-blue-500 flex items-center justify-center text-white">
                      1
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 lg:pr-16 lg:text-right">
                    <div className="lg:hidden h-8 w-8 rounded-full bg-brand-blue-500 flex items-center justify-center text-white mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-medium">Cadastre sua Empresa</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                      Crie um perfil detalhado, envie documentos e passe pelo processo de verificação.
                    </p>
                  </div>
                  
                  <div className="mt-8 lg:mt-0 lg:w-1/2 lg:pl-16">
                    {/* Placeholder for illustration */}
                    <div className="rounded-xl bg-white dark:bg-slate-800 shadow p-4 border border-slate-200 dark:border-slate-700">
                      <div className="aspect-video rounded-lg bg-slate-100 dark:bg-slate-700"></div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative lg:flex pt-12 lg:pt-24">
                  <div className="hidden lg:block absolute top-0 left-1/2 -ml-0.5">
                    <div className="h-8 w-8 rounded-full bg-brand-blue-500 flex items-center justify-center text-white">
                      2
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 lg:pr-16">
                    {/* Placeholder for illustration */}
                    <div className="rounded-xl bg-white dark:bg-slate-800 shadow p-4 border border-slate-200 dark:border-slate-700">
                      <div className="aspect-video rounded-lg bg-slate-100 dark:bg-slate-700"></div>
                    </div>
                  </div>
                  
                  <div className="mt-8 lg:mt-0 lg:w-1/2 lg:pl-16 lg:text-left">
                    <div className="lg:hidden h-8 w-8 rounded-full bg-brand-blue-500 flex items-center justify-center text-white mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-medium">Configure sua Oferta</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                      Defina os parâmetros da tokenização, estabeleça o valor de captação e configure os termos.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative lg:flex pt-12 lg:pt-24">
                  <div className="hidden lg:block absolute top-0 left-1/2 -ml-0.5">
                    <div className="h-8 w-8 rounded-full bg-brand-blue-500 flex items-center justify-center text-white">
                      3
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 lg:pr-16 lg:text-right">
                    <div className="lg:hidden h-8 w-8 rounded-full bg-brand-blue-500 flex items-center justify-center text-white mb-4">
                      3
                    </div>
                    <h3 className="text-xl font-medium">Gerencie Investimentos</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">
                      Acompanhe o progresso da captação, interaja com investidores e forneça atualizações regulares.
                    </p>
                  </div>
                  
                  <div className="mt-8 lg:mt-0 lg:w-1/2 lg:pl-16">
                    {/* Placeholder for illustration */}
                    <div className="rounded-xl bg-white dark:bg-slate-800 shadow p-4 border border-slate-200 dark:border-slate-700">
                      <div className="aspect-video rounded-lg bg-slate-100 dark:bg-slate-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Oportunidades em Destaque</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Conheça algumas das empresas que estão captando recursos em nossa plataforma
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {featuredOffers.map((offer) => (
              <div key={offer.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-4">
                      <span className="font-bold text-brand-blue-500">{offer.company?.name.substring(0, 2)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{offer.company?.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{offer.company?.industry}</p>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-lg mt-2">{offer.title}</h4>
                  <p className="mt-2 text-slate-600 dark:text-slate-300 line-clamp-2">
                    {offer.description}
                  </p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Meta</p>
                      <p className="font-semibold">R$ {(offer.goalAmount).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Captado</p>
                      <p className="font-semibold">R$ {(offer.raisedAmount).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-blue-500 to-brand-green-500 rounded-full" 
                      style={{ width: `${Math.min(100, (offer.raisedAmount / offer.goalAmount) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 text-right">
                    {Math.round((offer.raisedAmount / offer.goalAmount) * 100)}% completo
                  </p>
                  
                  <div className="mt-6">
                    <Link to={`/offer/${offer.id}`}>
                      <Button className="w-full">
                        Ver Detalhes
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/investor">
              <Button variant="outline" className="px-8">
                Ver Todas as Oportunidades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Principais Benefícios</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Nossa plataforma oferece vantagens significativas para empresas e investidores
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
              <div className="h-12 w-12 rounded-xl bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-brand-blue-500" />
              </div>
              <h3 className="text-xl font-medium">Seguro & Regulamentado</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Operações em conformidade com a legislação e protocolos avançados de segurança.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
              <div className="h-12 w-12 rounded-xl bg-brand-green-100 dark:bg-brand-green-900/30 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-brand-green-500" />
              </div>
              <h3 className="mt-0 text-xl font-medium">Eficiente & Rápido</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Processo de captação simplificado, sem burocracia e com tempos de execução reduzidos.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
              <div className="h-12 w-12 rounded-xl bg-brand-blue-100 dark:bg-brand-blue-900/30 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-brand-blue-500" />
              </div>
              <h3 className="mt-0 text-xl font-medium">Acesso Ampliado</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Conecte-se com uma base global de investidores ou descubra oportunidades exclusivas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Perguntas Frequentes</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Respostas para as dúvidas mais comuns sobre nossa plataforma
            </p>
          </div>

          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Como funciona a tokenização de ativos?</AccordionTrigger>
                <AccordionContent>
                  A tokenização é o processo de representação digital de um ativo real na blockchain. 
                  Em nossa plataforma, as empresas podem tokenizar suas ações ou participações, 
                  dividindo o capital em tokens que representam propriedade parcial, facilitando 
                  o investimento fracionado e aumentando a liquidez.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Quais são os requisitos para empresas?</AccordionTrigger>
                <AccordionContent>
                  Empresas precisam passar por um processo de verificação que inclui validação de documentos,
                  análise financeira e verificação de conformidade legal. Aceitamos empresas estabelecidas e
                  startups em estágios iniciais, desde que atendam aos critérios de elegibilidade.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Como é garantida a segurança dos investimentos?</AccordionTrigger>
                <AccordionContent>
                  Todos os contratos são registrados na blockchain, garantindo imutabilidade e transparência.
                  Utilizamos contratos inteligentes auditados, protocolos de segurança avançados e verificação
                  de identidade para todos os participantes. Além disso, os processos seguem regulamentações
                  aplicáveis do mercado de capitais.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Qual o valor mínimo para investimento?</AccordionTrigger>
                <AccordionContent>
                  O valor mínimo de investimento varia para cada oportunidade, mas geralmente começa a partir
                  de R$ 1.000, tornando esses investimentos muito mais acessíveis do que no mercado tradicional.
                  Algumas ofertas podem ter valores mínimos diferentes, sempre especificados na descrição.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Como funciona a liquidez dos tokens?</AccordionTrigger>
                <AccordionContent>
                  Nossa plataforma inclui um marketplace integrado onde os tokens podem ser negociados 
                  após o período de carência inicial. A liquidez é facilitada por mecanismos de 
                  formação de mercado e uma base ativa de usuários, permitindo que investidores comprem
                  e vendam seus tokens com mais facilidade que em investimentos tradicionais.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-blue-500 to-brand-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Pronto para transformar o futuro do investimento?</h2>
          <p className="mt-4 text-xl opacity-90 max-w-3xl mx-auto">
            Junte-se a centenas de empresas e milhares de investidores que já estão revolucionando o mercado de capitais.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="w-full sm:w-auto px-8 py-6 bg-white text-brand-blue-500 hover:bg-slate-100 text-lg">
                Criar Conta
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/company">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg border-white text-white hover:bg-white/10">
                Saiba Mais
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
