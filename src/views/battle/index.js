export const initBattle = () => {
  const { app, addCraft, playground } = window;
  app.viewport.fit(window.it);
  app.viewport.follow(window.it);

  const obstacles = [];

  const seeds = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 500),
  );

  seeds.forEach((value, id) => {
    obstacles.push(
      addCraft({
        id,
        model: 'BasicShape',
        host: playground,
        type: 'rectangle',
        position: { x: Math.random() * value, y: Math.random() * value },
        size: { width: Math.random() * 100, height: Math.random() * 100 },
        isStatic: true,
        debug: false,
      }),
    );
  });
};
