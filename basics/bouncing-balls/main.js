const para = document.querySelector('p');
// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth * 0.95;
const height = canvas.height = window.innerHeight * 0.90;

// 小球数组
let balls = [];
let count = 0;

// 生成随机数的函数
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 生成随机颜色
function randomColor() {
  return (`rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
}

class Shape {
  constructor(x, y, velx, vely, alive) {
    this.x = x;
    this.y = y;
    this.velx = velx;
    this.vely = vely;
    this.alive = alive
  }
}

// 小球类
class Ball extends Shape {
  constructor(x, y, velx, vely, color, size, alive) {
    super(x, y, velx, vely, alive);
    this.color = color;
    this.size = size;
  }

  // 绘制小球
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // 更新位置
  update() {
    if (this.x + this.size >= width) {
      this.velx = -this.velx;
    }
    if (this.x - this.size <= 0) {
      this.velx = -this.velx
    }
    if (this.y + this.size >= height) {
      this.vely = -this.vely;
    }
    if (this.y - this.size <= 0) {
      this.vely = -this.vely;
    }
    this.x += this.velx;
    this.y += this.vely;
  }

  // 碰撞检测
  conflictsDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + ball.size && ball.alive) {
          ball.color = this.color = randomColor();
        }
      }
    }
  }
}

// 恶魔圈
class EvilCircle extends Shape {
  constructor(x, y, alive) {
    super(x, y, 20, 20, alive);
    this.color = 'white';
    this.size = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x -= this.size;
    }
    if (this.x - this.size <= 0) {
      this.x += this.size;
    }
    if (this.y + this.size >= height) {
      this.y -= this.size;
    }
    if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  }

  setControls() {
    window.onkeydown = (e) => {
      switch (e.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
          this.x -= this.velx;
          break;
        case 'd':
        case 'D':
        case 'ArrowRight':
          this.x += this.velx;
          break;
        case 'w':
        case 'W':
        case 'ArrowUp':
          this.y -= this.vely;
          break;
        case 's':
        case 'S':
        case 'ArrowDown':
          this.y += this.vely;
          break;
      }
    }
  }

  conflictsDetect() {
    for (const ball of balls) {
      if (!ball.alive) {
        continue;
      }
      // 计算圆心距离
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      // console.log(`distance: ${distance} -> ${this.size + ball.size}`);
      if (distance < this.size + ball.size) {
        ball.alive = false;
        count--;
        para.textContent = `剩余彩球数： ${count}`;
      }
    }
  }
}

// 创建小球
function prepare(limit) {
  while (balls.length <= limit) {
    let size = random(10, 20);
    let ball = new Ball(
      random(size, width - size),
      random(size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      size, true);
    balls.push(ball);
    count++;
    para.textContent = `剩余彩球数：${count}`;
  }
}

// 开始运行
function start() {
  prepare(50);
  let evil = new EvilCircle(random(0, width), random(0, height), true);
  evil.setControls();
  // 循环处理
  function loop() {
    ctx.fillStyle = `rgb(0, 0, 0, 0.25)`;
    ctx.fillRect(0, 0, width, height);
    for (const ball of balls) {
      if (!ball.alive) {
        continue;
      }
      ball.draw();
      ball.update();
      ball.conflictsDetect();
    }

    evil.draw();
    evil.checkBounds();
    evil.conflictsDetect();

    requestAnimationFrame(loop);
  }
  loop();
}

start();
