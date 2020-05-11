# Recuperação de senha
**RF**
<!--
Requisito Funcional
São as funcionalidades que teremos dentro deste item
-->
- Usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**
<!--
Requisito Não Funcional
Não são ligadas diretamente a regra de negócio da aplicação
-->

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
  - https:mailtrap.io
- Utilizar Amazon SES para envios em produção;
- Envio de emails deve acontecer em segundo plano (background job);


**RN**
<!-- Regra Negócio -->
- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário deve confirmar a senha ao fazer o reset;

# Atualização do perfil
**RF**
- O usuário deve poder atualizar o seu perfil: nome, email, senha;

**RNF**

**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Agendamento de serviço

**RF**
- O usuário deve poder listar todos os prestadoes de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;

**RNF**
- Listagem de prestadores deve ser armazenada em cache

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estas disponíveis entre 8h e 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

# Painel do prestador
**RF**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizr as notificações não lidas

**RNF**
- OS agendamentos do prestador do dia devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas no mongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**
- A notificação deve ter um stats de lida ou não-lida;
