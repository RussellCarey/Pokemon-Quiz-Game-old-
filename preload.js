export function loadSound(sounds) {
  let vid = new Audio();
  vid.src = `./PokemonGame/sound/whosthatpokemon.wav`;
  sounds.push(vid);
  console.log("Pushed and preloaded Sound");
}

export function letters(letters) {
  const l = [
    `./PokemonGame/font/a.PNG`,
    `./PokemonGame/font/b.PNG`,
    `./PokemonGame/font/c.PNG`,
    `./PokemonGame/font/d.PNG`,
    `./PokemonGame/font/e.PNG`,
    `./PokemonGame/font/f.PNG`,
    `./PokemonGame/font/g.PNG`,
    `./PokemonGame/font/h.PNG`,
    `./PokemonGame/font/i.PNG`,
    `./PokemonGame/font/j.PNG`,
    `./PokemonGame/font/k.PNG`,
    `./PokemonGame/font/l.PNG`,
    `./PokemonGame/font/m.PNG`,
    `./PokemonGame/font/n.PNG`,
    `./PokemonGame/font/o.PNG`,
    `./PokemonGame/font/p.PNG`,
    `./PokemonGame/font/q.PNG`,
    `./PokemonGame/font/r.PNG`,
    `./PokemonGame/font/s.PNG`,
    `./PokemonGame/font/t.PNG`,
    `./PokemonGame/font/u.PNG`,
    `./PokemonGame/font/v.PNG`,
    `./PokemonGame/font/w.PNG`,
    `./PokemonGame/font/x.PNG`,
    `./PokemonGame/font/y.PNG`,
    `./PokemonGame/font/z.PNG`,
  ];

  for (let i = 0; i < l.length; i++) {
    let font = new Image();
    font.src = l[i];
    letters.push[font];
  }
  console.log("Preloaded all fonts");
}
