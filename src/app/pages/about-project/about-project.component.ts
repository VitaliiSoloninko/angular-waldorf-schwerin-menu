import { Component } from '@angular/core';

@Component({
  selector: 'app-about-project',
  imports: [],
  templateUrl: './about-project.component.html',
  styleUrl: './about-project.component.scss',
})
export class AboutProjectComponent {
  lang: 'de' | 'en' = 'de';

  description = {
    de: 'Waldorf Menu ist eine moderne Plattform für die Verwaltung von Schulessen, Bestellungen und Benutzerkonten. Entwickelt für Eltern, Lehrkräfte und Administratoren.',
    en: 'Waldorf Menu is a modern platform for managing school meals, orders, and user accounts. Developed for parents, teachers, and administrators.',
  };

  developer = {
    de: 'Entwickler: Vitalii Soloninko',
    en: 'Developer: Vitalii Soloninko',
  };

  techStack = [
    { de: 'FRONTEND', en: 'FRONTEND' },
    { de: 'Angular 17+', en: 'Angular 17+' },
    { de: 'TypeScript', en: 'TypeScript' },
    { de: 'RxJS', en: 'RxJS' },
    { de: 'SCSS', en: 'SCSS' },
    { de: 'Ngx-toastr', en: 'Ngx-toastr' },
    { de: 'Luxon', en: 'Luxon' },
    { de: 'jsPDF', en: 'jsPDF' },
    { de: 'Lucide icons', en: 'Lucide icons' },
    { de: 'BACKEND', en: 'BACKEND' },
    { de: 'Node.js', en: 'Node.js' },
    { de: 'NestJS', en: 'NestJS' },
    { de: 'PostgreSQL', en: 'PostgreSQL' },
    { de: 'Sequelize', en: 'Sequelize' },
    { de: 'Swagger', en: 'Swagger' },
    { de: 'Bcrypt', en: 'Bcrypt' },
    { de: 'JSON Web Tokens', en: 'JSON Web Tokens' },
    { de: 'Nodemailer', en: 'Nodemailer' },
  ];

  sections = [
    {
      de: 'Speisekarte',
      en: 'Menu',
    },
    {
      de: 'Warenkorb',
      en: 'Cart',
    },
    {
      de: 'Bestellungen',
      en: 'Orders',
    },
    {
      de: 'Kontakte',
      en: 'Contacts',
    },
    {
      de: 'Benutzerprofil',
      en: 'User profile',
    },
    {
      de: 'Anmeldung',
      en: 'Login',
    },
    {
      de: 'Registrierung',
      en: 'Registration',
    },
    {
      de: 'Passwort zurücksetzen',
      en: 'Password reset',
    },
    {
      de: 'Admin-Konsole',
      en: 'Admin console',
    },
    {
      de: 'Benutzersuche',
      en: 'User search',
    },
    {
      de: 'Statistiken',
      en: 'Statistics',
    },
    {
      de: 'Bestellungen',
      en: 'Orders',
    },
    {
      de: 'Menübearbeitung',
      en: 'Menu editing',
    },
    {
      de: 'Rechnungen',
      en: 'Invoices',
    },
  ];

  features = [
    {
      de: 'Responsives Design',
      en: 'Responsive design',
    },
    {
      de: 'Wiederverwendbare Tabellen',
      en: 'Reusable tables',
    },
    {
      de: 'Modale Bestätigungen',
      en: 'Modal confirmations',
    },
    {
      de: 'PDF-Berichte',
      en: 'PDF reports',
    },
    {
      de: 'Benutzer- und Bestellsuche',
      en: 'User and order search',
    },
    {
      de: 'Toast-Benachrichtigungen',
      en: 'Toast notifications',
    },
    {
      de: 'Moderne Architektur',
      en: 'Modern architecture',
    },
    {
      de: 'Formularvalidierung',
      en: 'Form validation',
    },
  ];
}
