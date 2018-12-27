/**
 * @license
 * Copyright DataOcean. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ThemeSwitherPos, RegistedThemes } from './globalTypes';

export const environment = {
  production: true,
  apiurl: 'http://219.239.97.111:10075',
  showSideBar: false,
  showNavBar: false,
  showThemeSwither: ThemeSwitherPos.profile,
  defaultTheme: RegistedThemes.default,
};
