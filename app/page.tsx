import { useState } from 'react';

type Estado = 'GO' | 'DF' | 'MT';
type Padrao = 'baixo' | 'medio' | 'alto';
type Filtro = 'todos' | 'engenharia' | 'execucao' | 'documentacao';
type TipoServico = Exclude<Filtro, 'todos'>;
import { MessageCircle, Hammer, FileText, Building, ClipboardCheck } from 'lucide-react';

export default function SiteConstrucaoReforma() {
  const [area, setArea] = useState('');
  const [estado, setEstado] = useState<Estado>('GO');
  const [padrao, setPadrao] = useState<Padrao>('medio');
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const cubBase: Record<Estado, number> = {
    GO: 1920,
    DF: 2260,
    MT: 1950,
  };

  const fatorPadrao: Record<Padrao, number> = {
    baixo: 0.85,
    medio: 1,
    alto: 1.25,
  };

  const metragem = Number(area);
  const valorReferencia = cubBase[estado] * fatorPadrao[padrao];
  const valorMedio = metragem > 0 ? metragem * valorReferencia : 0;
  const valorFormatado = valorMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const services: Array<{
    title: string;
    tipo: TipoServico;
    icon: typeof MessageCircle;
    desc: string;
    img: string;
  }> = [
    { title: 'Laudos de Reforma', tipo: 'engenharia', icon: FileText, desc: 'Laudos técnicos para aprovação de reformas.', img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0' },
    { title: 'Reforço Estrutural', tipo: 'engenharia', icon: Building, desc: 'Reforço e segurança estrutural.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e' },
    { title: 'Reformas', tipo: 'execucao', icon: Hammer, desc: 'Reformas completas com acabamento.', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511' },
    { title: 'Construção', tipo: 'execucao', icon: Hammer, desc: 'Construção do zero com qualidade.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e' },
    { title: 'ART', tipo: 'documentacao', icon: ClipboardCheck, desc: 'Regularização técnica da obra.', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800' },
    { title: 'Projetos', tipo: 'engenharia', icon: FileText, desc: 'Projetos completos de engenharia.', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e' },
    { title: 'Acompanhamento', tipo: 'engenharia', icon: ClipboardCheck, desc: 'Supervisão técnica da obra.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
    { title: 'Gestão de Obras', tipo: 'engenharia', icon: Building, desc: 'Gestão completa da obra.', img: 'https://images.unsplash.com/photo-1507209696998-3c532be9b2b5?w=800' },
    { title: 'Financiamento', tipo: 'documentacao', icon: FileText, desc: 'Documentação para financiamento.', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa' },
  ];

  const servicesFiltrados = filtro === 'todos' ? services : services.filter(s => s.tipo === filtro);

  return (
    <div className="min-h-screen bg-white text-slate-800">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="data:image/jpeg;base64,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"
              alt="Concretize"
              className="h-14 w-auto object-contain"
            />
            
          </div>

          <a
            href={`https://wa.me/5561995052395?text=${encodeURIComponent('Olá! Vi o site e quero fazer um orçamento. Tenho um projeto e gostaria de entender valores e prazos. Pode me atender?')}`}
            className="bg-emerald-600 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> Orçamento
          </a>
        </div>
      </header>

      {/* BANNER */}
      <section className="bg-gradient-to-r from-emerald-700 to-emerald-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold max-w-xl">
            Engenharia completa para sua obra, do projeto à execução
          </h1>
          <p className="mt-4 max-w-lg">
            Especialistas em construção, reformas e regularização. Segurança, qualidade e confiança em cada etapa.
          </p>
          <a
            href={`https://wa.me/5561995052395?text=${encodeURIComponent('Olá! Vi o site e quero fazer um orçamento. Tenho um projeto e gostaria de entender valores e prazos. Pode me atender?')}`}
            className="mt-6 inline-block bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold"
          >
            Solicitar orçamento
          </a>
        </div>
      </section>

            {/* SOBRE A EMPRESA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold">Sobre a Concretize</h2>

          <p className="mt-6 max-w-3xl text-slate-600 leading-7">
            A Concretize Arq & Engenharia atua com soluções completas em engenharia, oferecendo desde a elaboração de projetos até a execução e gestão de obras. Nosso foco é entregar qualidade, segurança e eficiência, garantindo que cada cliente tenha sua obra realizada com excelência e dentro dos padrões técnicos exigidos.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold text-emerald-600 text-lg">Missão</h3>
              <p className="mt-3 text-sm text-slate-600">
                Entregar soluções completas em engenharia com qualidade, segurança e transparência, garantindo a satisfação dos nossos clientes em cada etapa da obra.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold text-emerald-600 text-lg">Visão</h3>
              <p className="mt-3 text-sm text-slate-600">
                Ser referência em engenharia e construção, reconhecida pela excelência na execução, inovação e confiança no mercado.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold text-emerald-600 text-lg">Valores</h3>
              <ul className="mt-3 text-sm text-slate-600 space-y-2">
                <li>• Compromisso com qualidade</li>
                <li>• Transparência com o cliente</li>
                <li>• Responsabilidade técnica</li>
                <li>• Segurança em todas as etapas</li>
                <li>• Respeito a prazos</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold">Nossos Serviços</h2>

          <div className="mt-6 flex gap-3">
            {(['todos', 'engenharia', 'execucao', 'documentacao'] as Filtro[]).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 rounded-full ${filtro === f ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesFiltrados.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-2">
                  <img src={item.img} alt={item.title} className="h-48 w-full object-cover" onError={(e)=>{e.currentTarget.src='https://via.placeholder.com/400x300?text=Imagem';}} />
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <Icon className="text-emerald-600" />
                      <h3 className="font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ORÇAMENTO */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold">Simulação de investimento da obra</h2>
          <p className="mt-3 text-slate-600">Preencha as informações abaixo para obter uma estimativa inicial de investimento com base no CUB atualizado.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Estado</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value as Estado)} className="p-3 rounded border">
              <option>GO</option>
              <option>DF</option>
              <option>MT</option>
            </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Padrão da sua obra</label>

            <select value={padrao} onChange={(e) => setPadrao(e.target.value as Padrao)} className="p-3 rounded border">
              <option value="baixo">Baixo</option>
              <option value="medio">Médio</option>
              <option value="alto">Alto</option>
            </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">Metragem total estimada (m²)</label>

            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="m²" className="p-3 border rounded" />
            </div>
          </div>

          <div className="mt-8 bg-emerald-600 text-white p-6 rounded-2xl">
            <h3 className="text-2xl font-bold">{metragem > 0 ? valorFormatado : 'Informe a metragem'}</h3>
          </div>
        </div>
      </section>

            {/* CONTATO */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Fale com a gente</h2>
          <p className="mt-4 text-slate-600">Entre em contato pelo WhatsApp ou envie um e-mail.</p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <a
              href={`https://wa.me/5561995052395?text=${encodeURIComponent('Olá! Vi o site e quero fazer um orçamento. Tenho um projeto e gostaria de entender valores e prazos. Pode me atender?')}`}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <MessageCircle /> Falar no WhatsApp
            </a>

            <a
              href="mailto:Concretizearqui@gmail.com"
              className="text-emerald-700 font-semibold underline"
            >
              Concretizearqui@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOAT */}
      <a
        href={`https://wa.me/5561995052395?text=${encodeURIComponent('Olá! Vi o site e quero fazer um orçamento. Tenho um projeto e gostaria de entender valores e prazos. Pode me atender?')}`}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white px-5 py-3 rounded-full flex gap-2 animate-pulse"
      >
        <MessageCircle /> WhatsApp
      </a>

    </div>
  );
}
