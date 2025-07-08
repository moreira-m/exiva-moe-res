export const vocationMap = {
  'Elite Knight': 'Knight',
  'Master Sorcerer': 'Sorcerer',
  'Royal Paladin': 'Paladin',
  'Elder Druid': 'Druid',
  'Exalted Monk': 'Monk',
};

export const roleIcons = {
  Sorcerer: '/roles/sorcerer-front.png',
  Druid: '/roles/druid-front.png',
  Knight: '/roles/knight-front.png',
  Paladin: '/roles/paladin-front.png',
  Monk: '/roles/monk-front.png',
};

export function getRoleIcon(vocation) {
  const base = vocationMap[vocation] || vocation;
  return roleIcons[base];
}
