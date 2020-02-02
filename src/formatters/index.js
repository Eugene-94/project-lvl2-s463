import treeRender from './tree';
import plainRender from './plain';

export default (ast, formatter) => {
  const formatsType = {
    tree: treeRender,
    plain: plainRender,
  };

  const render = formatsType[formatter];

  return render(ast);
};
