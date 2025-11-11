import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente antes de importar db
dotenv.config();

import { db } from '../src/config/db';
import { profiles, skills, profileSkills, socialLinks, experiences, education, projects } from './schema';

async function main() {
    console.log('Iniciando seed...');

    // Limpar dados existentes
    await db.delete(profileSkills);
    await db.delete(socialLinks);
    await db.delete(experiences);
    await db.delete(education);
    await db.delete(projects);
    await db.delete(profiles);
    await db.delete(skills);

    // Criar habilidades
    const skillsData = await db.insert(skills).values([
        { name: 'react' },
        { name: 'node.js' },
        { name: 'typescript' },
        { name: 'postgresql' },
        { name: 'express' },
        { name: 'drizzle' },
        { name: 'docker' },
        { name: 'aws' },
        { name: 'javascript' },
        { name: 'python' },
    ]).returning();

    // Pessoa 1: Ana Silva - Desenvolvedora Frontend Sênior
    const [anaSilva] = await db.insert(profiles).values({
        email: 'ana.silva@email.com',
        name: 'Ana Silva',
        headline: 'Desenvolvedora Frontend Sênior',
        bio: 'Desenvolvedora com mais de 5 anos de experiência em desenvolvimento frontend, especializada em React e TypeScript. Apaixonada por criar interfaces modernas e responsivas.',
    }).returning();

    // Associar habilidades à Ana
    await db.insert(profileSkills).values([
        { profileId: anaSilva.id, skillId: skillsData[0].id }, // react
        { profileId: anaSilva.id, skillId: skillsData[2].id }, // typescript
        { profileId: anaSilva.id, skillId: skillsData[8].id }, // javascript
    ]);

    // Experiências da Ana
    await db.insert(experiences).values([
        {
            title: 'Desenvolvedora Frontend Sênior',
            company: 'TechCorp',
            location: 'São Paulo, SP',
            startDate: new Date('2022-01-01'),
            endDate: null,
            description: 'Liderança técnica de equipe de frontend, desenvolvimento de componentes reutilizáveis em React, arquitetura de aplicações escaláveis.',
            profileId: anaSilva.id,
        },
        {
            title: 'Desenvolvedora Frontend Pleno',
            company: 'StartupXYZ',
            location: 'São Paulo, SP',
            startDate: new Date('2020-03-01'),
            endDate: new Date('2021-12-31'),
            description: 'Desenvolvimento de features com React e TypeScript, colaboração com equipe de design para implementar interfaces modernas.',
            profileId: anaSilva.id,
        },
        {
            title: 'Desenvolvedora Frontend Júnior',
            company: 'WebDev Solutions',
            location: 'São Paulo, SP',
            startDate: new Date('2019-01-01'),
            endDate: new Date('2020-02-28'),
            description: 'Desenvolvimento de interfaces web responsivas, manutenção de código legado, aprendizado de boas práticas de desenvolvimento.',
            profileId: anaSilva.id,
        },
    ]);

    // Formações da Ana
    await db.insert(education).values([
        {
            institution: 'Universidade de São Paulo',
            degree: 'Bacharelado em Ciência da Computação',
            fieldOfStudy: 'Ciência da Computação',
            startDate: new Date('2015-01-01'),
            endDate: new Date('2018-12-31'),
            description: 'Formação completa em ciência da computação com foco em desenvolvimento de software e algoritmos.',
            profileId: anaSilva.id,
        },
    ]);

    // Projetos da Ana
    await db.insert(projects).values([
        {
            name: 'E-commerce Platform',
            description: 'Plataforma completa de e-commerce desenvolvida em React com TypeScript, incluindo carrinho de compras, checkout e painel administrativo.',
            url: 'https://ecommerce-example.com',
            repositoryUrl: 'https://github.com/anasilva/ecommerce-platform',
            profileId: anaSilva.id,
        },
        {
            name: 'Design System Library',
            description: 'Biblioteca de componentes React reutilizáveis para uso em múltiplos projetos, com documentação completa e testes automatizados.',
            url: 'https://design-system-example.com',
            repositoryUrl: 'https://github.com/anasilva/design-system',
            profileId: anaSilva.id,
        },
    ]);

    // Links sociais da Ana
    await db.insert(socialLinks).values([
        {
            platform: 'LinkedIn',
            url: 'https://linkedin.com/in/ana-silva',
            profileId: anaSilva.id,
        },
        {
            platform: 'GitHub',
            url: 'https://github.com/anasilva',
            profileId: anaSilva.id,
        },
    ]);

    // Pessoa 2: Bruno Costa - Engenheiro de Backend
    const [brunoCosta] = await db.insert(profiles).values({
        email: 'bruno.costa@email.com',
        name: 'Bruno Costa',
        headline: 'Engenheiro de Backend',
        bio: 'Engenheiro de software especializado em desenvolvimento backend com Node.js e Python. Experiência em arquitetura de sistemas distribuídos e APIs escaláveis.',
    }).returning();

    // Associar habilidades ao Bruno
    await db.insert(profileSkills).values([
        { profileId: brunoCosta.id, skillId: skillsData[1].id }, // node.js
        { profileId: brunoCosta.id, skillId: skillsData[2].id }, // typescript
        { profileId: brunoCosta.id, skillId: skillsData[3].id }, // postgresql
        { profileId: brunoCosta.id, skillId: skillsData[4].id }, // express
        { profileId: brunoCosta.id, skillId: skillsData[5].id }, // drizzle
        { profileId: brunoCosta.id, skillId: skillsData[6].id }, // docker
        { profileId: brunoCosta.id, skillId: skillsData[7].id }, // aws
        { profileId: brunoCosta.id, skillId: skillsData[9].id }, // python
    ]);

    // Experiências do Bruno
    await db.insert(experiences).values([
        {
            title: 'Engenheiro de Backend Sênior',
            company: 'CloudTech Solutions',
            location: 'Rio de Janeiro, RJ',
            startDate: new Date('2021-06-01'),
            endDate: null,
            description: 'Arquitetura e desenvolvimento de APIs RESTful e GraphQL, implementação de microsserviços, gerenciamento de infraestrutura na AWS.',
            profileId: brunoCosta.id,
        },
        {
            title: 'Desenvolvedor Backend Pleno',
            company: 'DataFlow Inc',
            location: 'Rio de Janeiro, RJ',
            startDate: new Date('2019-01-01'),
            endDate: new Date('2021-05-31'),
            description: 'Desenvolvimento de APIs com Node.js e Express, integração com bancos de dados PostgreSQL, implementação de testes automatizados.',
            profileId: brunoCosta.id,
        },
        {
            title: 'Desenvolvedor Backend Júnior',
            company: 'TechStart',
            location: 'Rio de Janeiro, RJ',
            startDate: new Date('2017-06-01'),
            endDate: new Date('2018-12-31'),
            description: 'Desenvolvimento de endpoints REST, manutenção de código legado, aprendizado de boas práticas de desenvolvimento backend.',
            profileId: brunoCosta.id,
        },
    ]);

    // Formações do Bruno
    await db.insert(education).values([
        {
            institution: 'Universidade Federal do Rio de Janeiro',
            degree: 'Bacharelado em Engenharia de Computação',
            fieldOfStudy: 'Engenharia de Computação',
            startDate: new Date('2013-01-01'),
            endDate: new Date('2017-12-31'),
            description: 'Formação em engenharia de computação com ênfase em sistemas distribuídos e arquitetura de software.',
            profileId: brunoCosta.id,
        },
        {
            institution: 'Instituto de Tecnologia',
            degree: 'Pós-graduação em Arquitetura de Software',
            fieldOfStudy: 'Arquitetura de Software',
            startDate: new Date('2018-01-01'),
            endDate: new Date('2019-12-31'),
            description: 'Especialização em arquitetura de software, padrões de design e sistemas escaláveis.',
            profileId: brunoCosta.id,
        },
    ]);

    // Projetos do Bruno
    await db.insert(projects).values([
        {
            name: 'API Gateway Microservices',
            description: 'Sistema de gateway de API para orquestração de microsserviços, desenvolvido em Node.js com TypeScript, incluindo autenticação JWT e rate limiting.',
            url: 'https://api-gateway-example.com',
            repositoryUrl: 'https://github.com/brunocosta/api-gateway',
            profileId: brunoCosta.id,
        },
        {
            name: 'Real-time Chat System',
            description: 'Sistema de chat em tempo real usando WebSockets, Node.js e PostgreSQL, com suporte a múltiplas salas e notificações push.',
            url: 'https://chat-example.com',
            repositoryUrl: 'https://github.com/brunocosta/realtime-chat',
            profileId: brunoCosta.id,
        },
        {
            name: 'Task Management API',
            description: 'API RESTful completa para gerenciamento de tarefas, com autenticação, autorização e integração com banco de dados PostgreSQL.',
            repositoryUrl: 'https://github.com/brunocosta/task-api',
            profileId: brunoCosta.id,
        },
    ]);

    // Links sociais do Bruno
    await db.insert(socialLinks).values([
        {
            platform: 'LinkedIn',
            url: 'https://linkedin.com/in/bruno-costa',
            profileId: brunoCosta.id,
        },
        {
            platform: 'GitHub',
            url: 'https://github.com/brunocosta',
            profileId: brunoCosta.id,
        },
        {
            platform: 'Twitter',
            url: 'https://twitter.com/brunocosta',
            profileId: brunoCosta.id,
        },
    ]);

    console.log('Seed concluído com sucesso!');
    console.log(`Criados 2 perfis:`);
    console.log(`- ${anaSilva.name} (${anaSilva.email})`);
    console.log(`- ${brunoCosta.name} (${brunoCosta.email})`);
}

main()
    .catch((e) => {
        console.error('Erro ao executar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        process.exit(0);
    });

