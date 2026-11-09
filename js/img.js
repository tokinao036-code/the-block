// Image registry. URLs are filled from tools/pins.json picks (Pinterest, hotlinked from i.pinimg.com).
import { IMG } from './data/images.js';
import { CHARS } from './data/chars.js';
import { esc } from './ui.js';

const ALIAS = {
  c_bronx: 'l7_scene', mu_herc: 'l7_scene', f_music_herc: 'mu_a_herc', c_gym: 'l4_scene', c_party: 'l6_scene',
  c_office: 'l5_scene', bg_campus: 'l3_cover', bg_gym: 'l4_cover', bg_manhattan: 'l5_cover', bg_rooftop: 'l6_cover',
  bg_bronx: 'l7_cover', bg_brooklyn: 'l1_cover', bg_williamsburg: 'l2_cover',
  mu_t_1: 'mu_oldschool', mu_t_2: 'mu_a_flash', mu_t_3: 'mu_a_rundmc', mu_t_4: 'mu_golden', mu_t_5: 'mu_a_biggie', mu_t_6: 'mu_a_pac',
  mu_t_7: 'mu_a_outkast', mu_t_8: 'mu_a_em', mu_t_9: 'mu_a_jayz', mu_t_10: 'mu_a_kendrick', mu_eastwest: 'mu_a_biggie',
};

export function img(key) {
  let k = key, n = 0;
  while (!IMG[k] && ALIAS[k] && n++ < 5) k = ALIAS[k];
  return IMG[k] || '';
}

const LOGO = `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#111"/><circle cx="20" cy="20" r="13" fill="#FFD23F"/><text x="20" y="25.5" text-anchor="middle" font-family="Dela Gothic One, Arial Black, sans-serif" font-size="15" fill="#111">B</text></svg>`;
export const logo = () => LOGO;

/** Round avatar of a character (or "block" for the official account, "max" for you). */
export function avatar(id, cls = '') {
  if (id === 'block') return `<span class="av ${cls}">${LOGO}</span>`;
  const c = CHARS[id];
  const u = c ? img(c.img) : '';
  if (u) return `<span class="av ${cls}" style="background-image:url('${u}')"></span>`;
  const name = c ? c.name : id === 'max' ? 'Max' : id;
  const col = c ? c.color : '#8E8E93';
  return `<span class="av av-txt ${cls}" style="--c:${col}">${esc(name[0].toUpperCase())}</span>`;
}
