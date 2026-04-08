'use client';

import { useMemo, useState } from 'react';

export default function ConcretizeSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [estado, setEstado] = useState('Goiás');
  const [cidade, setCidade] = useState('');
  const [padraoObra, setPadraoObra] = useState('Médio padrão');
  const [metragem, setMetragem] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [descricao, setDescricao] = useState('');

  const services = [
    {
      title: 'ART e Regularização',
      description:
        'Emissão de ART, suporte documental e acompanhamento técnico para garantir conformidade, segurança e respaldo legal em cada etapa do projeto.',
      image:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Gestão de Obras',
      description:
        'Planejamento, acompanhamento físico da obra, controle de cronograma, qualidade e apoio técnico para execução com eficiência e previsibilidade.',
      image:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Projetos e Consultoria',
      description:
        'Soluções sob medida para obras residenciais, comerciais e corporativas, com foco em organização, viabilidade e resultado.',
      image:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const values = [
    {
      title: 'Missão',
      text: 'Entregar soluções em engenharia com responsabilidade técnica, organização e excelência na execução.',
    },
    {
      title: 'Visão',
      text: 'Ser referência em serviços de engenharia, gestão de obras e regularização técnica, com confiança e credibilidade no mercado.',
    },
    {
      title: 'Valores',
      text: 'Compromisso, transparência, segurança, qualidade, respeito ao cliente e responsabilidade em cada entrega.',
    },
  ];

  const cubPorEstado: Record<string, number> = {
    Goiás: 1920,
    'Distrito Federal': 2260,
    'Mato Grosso': 1950,
    Outro: 2000,
  };

  const fatorPorPadrao: Record<string, number> = {
    'Padrão econômico': 0.9,
    'Médio padrão': 1,
    'Alto padrão': 1.25,
    Comercial: 1.15,
  };

  const metragemNumerica = useMemo(() => {
    const valor = String(metragem).replace(',', '.').replace(/[^\d.]/g, '');
    return Number(valor);
  }, [metragem]);

  const valorEstimado = useMemo(() => {
    const cub = cubPorEstado[estado] || 0;
    const fator = fatorPorPadrao[padraoObra] || 1;
    return metragemNumerica > 0 ? metragemNumerica * cub * fator : 0;
  }, [estado, padraoObra, metragemNumerica]);

  const valorEstimadoFormatado = valorEstimado.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const mensagemWhatsApp = encodeURIComponent(
    [
      'Olá! Fiz uma simulação de orçamento no site da Concretize Engenharia e gostaria de mais detalhes.',
      '',
      `Nome: ${nome || 'Não informado'}`,
      `Telefone: ${telefone || 'Não informado'}`,
      `E-mail: ${email || 'Não informado'}`,
      `Estado: ${estado}`,
      `Cidade: ${cidade || 'Não informada'}`,
      `Padrão da obra: ${padraoObra}`,
      `Metragem total estimada: ${metragemNumerica > 0 ? `${metragemNumerica} m²` : 'Não informada'}`,
      `Valor estimado inicial: ${metragemNumerica > 0 ? valorEstimadoFormatado : 'Não calculado'}`,
      `Descrição: ${descricao || 'Não informada'}`,
      '',
      'Gostaria de receber um orçamento mais detalhado.',
    ].join('\n')
  );

  const linkWhatsAppSimulacao = `https://wa.me/5561995052395?text=${mensagemWhatsApp}`;

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src="/logo-transparent.png"
              alt="Logo Concretize Engenharia"
              className="h-12 w-auto object-contain brightness-110 drop-shadow-[0_8px_24px_rgba(0,0,0,0.38)]"
              onError={(e) => {
                e.currentTarget.src = 'https://dummyimage.com/300x100/0f172a/ffffff&text=CONCRETIZE';
              }}
            />
          </a>

          <nav className="hidden gap-6 text-sm font-medium text-slate-200 md:flex">
            <a href="#servicos" className="transition hover:text-emerald-300">Serviços</a>
            <a href="#sobre" className="transition hover:text-emerald-300">Sobre</a>
            <a href="#valores" className="transition hover:text-emerald-300">Missão, Visão e Valores</a>
            <a href="#orcamento" className="transition hover:text-emerald-300">Orçamento</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#orcamento"
              className="hidden rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(5,150,105,0.32)] transition hover:bg-emerald-500 md:inline-flex"
            >
              Solicitar orçamento
            </a>

            <button
              type="button"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur transition hover:bg-white/10 md:hidden"
            >
              <span className="text-xl leading-none">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-6 pb-6 pt-4 text-white backdrop-blur-xl md:hidden">
          <div className="space-y-3 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_20px_50px_rgba(2,6,23,0.35)]">
            <a
              href="#servicos"
              onClick={() => setMenuOpen(false)}
              className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              Serviços
            </a>
            <a
              href="#sobre"
              onClick={() => setMenuOpen(false)}
              className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              Sobre
            </a>
            <a
              href="#valores"
              onClick={() => setMenuOpen(false)}
              className="block rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-medium transition hover:bg-emerald-500/10 hover:text-emerald-300"
            >
              Missão, Visão e Valores
            </a>
            <a
              href="#orcamento"
              onClick={() => setMenuOpen(false)}
              className="block rounded-2xl border border-emerald-500/20 bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_15px_40px_rgba(5,150,105,0.25)] transition hover:bg-emerald-500"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>
      )}
      </header>

      <section id="inicio" className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1800&q=80"
            alt="Obra em andamento"
            className="h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.14),transparent_24%),linear-gradient(135deg,rgba(2,6,23,0.97),rgba(6,78,59,0.26),rgba(15,23,42,0.92),rgba(2,6,23,0.98))]" />

          {/* Marca d'água da logo (harmônica e central) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/logo-transparent.png')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: '620px',
              backgroundPosition: 'center',
              opacity: 0.14,
              filter: 'drop-shadow(0 0 35px rgba(16,185,129,0.16)) saturate(115%)',
              animation: 'floatLogo 10s ease-in-out infinite',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

          <div className="absolute inset-y-0 right-0 hidden w-[34%] bg-gradient-to-l from-emerald-500/12 via-emerald-400/5 to-transparent lg:block" />
        </div>

        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 px-6 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur">
              Engenharia, gestão e regularização com padrão premium
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Projetos e obras com <span className="text-emerald-300">sofisticação</span>, técnica e previsibilidade.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              A Concretize entrega soluções completas em engenharia para clientes que buscam segurança,
              organização, acabamento de qualidade e acompanhamento profissional em cada etapa do projeto.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#orcamento"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(5,150,105,0.34)] transition hover:bg-emerald-500"
              >
                Solicitar orçamento
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Conhecer serviços
              </a>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Atendimento</p>
                <p className="mt-3 text-lg font-semibold text-white">Residencial, comercial e corporativo</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Entrega</p>
                <p className="mt-3 text-lg font-semibold text-white">Mais controle, clareza e segurança técnica</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Posicionamento</p>
                <p className="mt-3 text-lg font-semibold text-white">Visual premium e execução com confiança</p>
              </div>
            </div>
          </div>

          <div className="mt-2 lg:justify-self-end">
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-3 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80">
                <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80"
                  alt="Equipe em reunião técnica"
                  className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[420px]"
                />
                <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Concretize Engenharia</p>
                    <p className="mt-3 text-xl font-semibold text-white sm:text-2xl">Responsabilidade técnica com apresentação de alto padrão.</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Imagem de marca</p>
                    <p className="mt-2 text-base leading-7 text-slate-200">
                      Um banner mais sofisticado, com logo aplicada de forma elegante, transmite autoridade e reforça a percepção de valor da empresa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Serviços</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Soluções pensadas para cada etapa da sua obra</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Trabalhamos com serviços técnicos e estratégicos para garantir segurança, regularidade e melhor desempenho na execução do seu projeto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
          {services.map((service) => (
            <div key={service.title} className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
              <img src={service.image} alt={service.title} className="h-52 w-full object-cover sm:h-56" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="sobre" className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Sobre a empresa</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Compromisso técnico com cada detalhe do projeto</h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              A Concretize Engenharia atua com foco em soluções técnicas, gestão eficiente e acompanhamento de obras, entregando mais organização, segurança e confiança para seus clientes.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Nosso trabalho une conhecimento técnico, atenção aos detalhes e atendimento próximo, sempre buscando viabilidade, conformidade e excelência em cada entrega.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-200">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80"
              alt="Equipe em reunião técnica"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="valores" className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Essência da empresa</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Missão, visão e valores que sustentam cada entrega</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {values.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="orcamento" className="bg-[linear-gradient(135deg,#020617,#0f172a,#111827)] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:gap-12">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Orçamento</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Solicite uma avaliação para o seu projeto</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              Preencha as informações abaixo para receber um contato com mais agilidade. Quanto mais detalhes, melhor será a análise inicial do seu atendimento.
            </p>
          </div>

          <form className="rounded-[32px] bg-white p-6 text-slate-900 shadow-[0_30px_90px_rgba(2,6,23,0.35)] sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Nome completo</label>
                <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="Digite seu nome" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Telefone</label>
                <input value={telefone} onChange={(e) => setTelefone(e.target.value)} type="text" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="(00) 00000-0000" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">E-mail</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="seuemail@exemplo.com" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Estado</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900">
                  <option>Goiás</option>
                  <option>Distrito Federal</option>
                  <option>Mato Grosso</option>
                  <option>Outro</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Cidade</label>
                <input value={cidade} onChange={(e) => setCidade(e.target.value)} type="text" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="Informe a cidade" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Padrão da sua obra</label>
                <select value={padraoObra} onChange={(e) => setPadraoObra(e.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900">
                  <option>Alto padrão</option>
                  <option>Médio padrão</option>
                  <option>Padrão econômico</option>
                  <option>Comercial</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Metragem total estimada</label>
                <input value={metragem} onChange={(e) => setMetragem(e.target.value)} type="text" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="Ex.: 250 m²" />
              </div>

              <div className="md:col-span-2 rounded-[28px] bg-slate-100 p-6 ring-1 ring-slate-200">
                <p className="text-sm font-medium text-slate-500">Simulação inicial do orçamento</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {metragemNumerica > 0 ? valorEstimadoFormatado : 'Preencha os campos para simular'}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Esta simulação é uma estimativa inicial com base no estado, padrão da obra e metragem informada. O valor final pode variar conforme escopo, acabamento e particularidades do projeto.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Descreva sua necessidade</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={5} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900" placeholder="Conte um pouco sobre a obra, serviço desejado e objetivo do atendimento" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-2">
              <button type="button" className="min-h-[52px] w-full rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Enviar solicitação
              </button>

              <a
                href={linkWhatsAppSimulacao}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_15px_40px_rgba(5,150,105,0.3)] transition hover:bg-emerald-500"
              >
                Enviar simulação no WhatsApp
              </a>
            </div>
          </form>
        </div>
      </section>

      <footer className="relative border-t border-white/10 bg-slate-950">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <img src="/logo-transparent.png" alt="marca d'água" className="h-40 w-auto" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-transparent.png"
              alt="Logo Concretize Engenharia"
              className="h-10 w-auto object-contain brightness-110"
              onError={(e) => {
                e.currentTarget.src = 'https://dummyimage.com/300x100/0f172a/ffffff&text=CONCRETIZE';
              }}
            />
          </div>
          <p>© {new Date().getFullYear()} Concretize Engenharia. Todos os direitos reservados.</p>
        </div>
      </footer>

      <a
        href={linkWhatsAppSimulacao}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(5,150,105,0.35)] transition hover:bg-emerald-500 md:hidden"
      >
        WhatsApp
      </a>

      <style jsx>{`
        @keyframes floatLogo {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}
