import treeRender from './tree';
import plainRender from './plain';
import jsonRender from './json';

export default (ast, formatter) => {
  const formatsType = {
    tree: treeRender,
    plain: plainRender,
    json: jsonRender,
  };

  const render = formatsType[formatter];

  return render(ast);
};
