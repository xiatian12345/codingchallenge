/**
* http://algorithmicbotany.org/papers/colonization.egwnp2007.large.pdf
* http://www.sea-of-memes.com/LetsCode26/LetsCode26.html
* Space Colonizer 太空殖民者(使用空间殖民算法对树木建模)
算法过程如下:
1 用点云随机填充某个你想要的树生成的形状。一个圆或球将会是你的第一个形状。把这些点放入到LEAVES数组中。在图中表示为绿色的点。
2 在点云的正下方，开始第一个分支点。将来会在其上堆叠数个点，以形成树的树干。每个点都将指向上一个点作为其父级。
  确保顶部分支点至少在某些叶子的MAX_DIST范围内.分支点在图中表示为黑色的点。
3 现在，对于LEAVES中的每个叶子，将叶子与所有BRANCHES进行比较，并获得方向向量DIR（叶子点--分支点）和距离DIST（DIR的长度）。在图中表示为黑色的线。
  如果DIST < MIN_DIST，从LEAVES中移除该叶子，并将该叶子标记为reached。
  如果DIST > MAX_DIST，跳过比较这个叶子和这个分支点，它们相距太远了。
  当你将一片叶子与所有分支点进行比较一次过后，请跟踪最接近的分支点以及该点的DIR和DIST。
  获取到最近的分支点之后，用DIR除以DIST以归一化该方向向量。然后添加方向向量到最近的分支点的GROW_DIR。增加改分支点的GROOW_COUNT。
4 在将所有叶子与所有分支点进行比较之后，遍历BRANCHES列表。GROW_COUNT > 0的那些将生成一个新的分支点。
  将GROW_DIR除以GROW_COUNT以得到平均方向，然后对其进行归一化。取分支点的位置并添加此新矢量以获得新分支点的位置。
  初始化该新分支点并将其添加到BRANCHES列表中。重置现有分支点的GROW_DIR和GROW_COUNT。
5 重复步骤3直到不再添加任何新的分支点。
*/
const windowWidth = 800;
const windowHeight = 600;
let tree = null;
function setup() {
	createCanvas(windowWidth, windowHeight);
	tree = new Tree();
}

function draw() {
	//在draw中一直调用，因此会一直重复步骤3直到不再添加任何新的分支点。
	if (5 >= tree.leaves.length) return;

	background(100);
	tree.show();
	tree.grow();
}
