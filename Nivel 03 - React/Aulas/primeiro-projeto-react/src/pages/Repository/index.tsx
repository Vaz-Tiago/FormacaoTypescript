import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import api from '../../services/api';

// Arquivos
import logoImg from '../../assets/logo.svg';

// Estilo
import { Header, RepositoryInfo, Issues } from './styles';

// Parametros da rota
interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}
const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });
    api.get(`/repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
    // ou
    // async function loadData(): Promise<void> {
    //   const [repository, issues] = await Promise.all([
    //     api.get(`/repositories/${params.repository}`);
    //     api.get(`/repositories/${params.repository}/issues`);

    //   ])
    // }
    // loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronsLeft size={16} /> Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description} </p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong> {repository.forks_count} </strong>
              <span>Forks</span>
            </li>
            <li>
              <strong> {repository.open_issues_count} </strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      {issues && (
        <Issues>
          {issues.map((issue) => (
            <a key={issue.id} href={issue.html_url}>
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronsRight size={16} />
            </a>
          ))}
        </Issues>
      )}
    </>
  );
};

export default Repository;
