import { container } from 'tsyringe';

import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherialMailProvider from './MailProvider/implementations/EtherialMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarMailTemplateProvider,
);

// Utiliza o resolve para injetar as dependencias que o provider necessita em seu construtor
// Como ele recebe o MailTemplateProvider como dependencia, deve ser executado depois
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherialMailProvider),
);
