const canvas = document.querySelector("#pallet");
const context = canvas.getContext("2d");

function project(x, y, z) {
  return [440 + (x - y) * 1.43, 345 + (x + y - 225) * 0.66 - z * 1.35];
}

function face(points, fill, stroke = fill) {
  context.beginPath();
  points.forEach(([x, y, z], index) => {
    const [screenX, screenY] = project(x, y, z);
    if (index === 0) context.moveTo(screenX, screenY);
    else context.lineTo(screenX, screenY);
  });
  context.closePath();
  context.fillStyle = fill;
  context.strokeStyle = stroke;
  context.lineWidth = 1.7;
  context.fill();
  context.stroke();
}

function box(x, y, z, width, depth, height, palette) {
  const right = x + width;
  const front = y + depth;
  const top = z + height;
  face([[right, y, z], [right, front, z], [right, front, top], [right, y, top]], palette[1], palette[3]);
  face([[x, front, z], [right, front, z], [right, front, top], [x, front, top]], palette[2], palette[3]);
  face([[x, y, top], [right, y, top], [right, front, top], [x, front, top]], palette[0], palette[3]);
}

if (context) {
  const sky = context.createLinearGradient(0, 0, 880, 500);
  sky.addColorStop(0, "#1b4259");
  sky.addColorStop(1, "#102739");
  context.fillStyle = sky;
  context.fillRect(0, 0, 880, 500);

  context.strokeStyle = "#365769";
  context.lineWidth = 1;
  for (let coordinate = -35; coordinate <= 285; coordinate += 20) {
    for (const [start, end] of [
      [project(coordinate, -35, -23), project(coordinate, 285, -23)],
      [project(-35, coordinate, -23), project(285, coordinate, -23)],
    ]) {
      context.beginPath();
      context.moveTo(...start);
      context.lineTo(...end);
      context.stroke();
    }
  }

  const wood = ["#cda579", "#785639", "#a77e56", "#513c2d"];
  const teal = ["#7bd6c0", "#307c75", "#4ca293", "#27565b"];
  const blue = ["#8cb8e1", "#496789", "#608cb4", "#2e536b"];
  const gold = ["#e9bb83", "#a36d3d", "#c78e53", "#775a42"];

  for (const x of [6, 102, 198]) box(x, 6, -22, 24, 174, 13, wood);
  for (const y of [0, 37, 74, 111, 148]) box(0, y, -9, 228, 33, 9, wood);

  const boxes = [
    [9, 8, 0, 68, 78, 52, blue], [80, 8, 0, 68, 78, 52, teal], [151, 8, 0, 68, 78, 52, gold],
    [9, 89, 0, 68, 78, 52, teal], [80, 89, 0, 68, 78, 52, blue], [151, 89, 0, 68, 78, 52, teal],
    [9, 8, 52, 104, 78, 50, teal], [115, 8, 52, 104, 78, 50, blue],
    [9, 89, 52, 104, 78, 50, gold], [115, 89, 52, 104, 78, 50, teal],
    [19, 16, 102, 87, 74, 47, blue], [110, 16, 102, 87, 74, 47, gold],
    [19, 93, 102, 87, 65, 47, teal],
  ];
  boxes.sort(([x1, y1, z1], [x2, y2, z2]) => z1 - z2 || (x1 + y1) - (x2 + y2));
  boxes.forEach((coordinates) => box(...coordinates));
}
