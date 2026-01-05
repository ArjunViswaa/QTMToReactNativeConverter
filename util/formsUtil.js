const buildQuantumTree = (arr) => {
  const map = {};
  const tree = [];

  arr.forEach(item => {
    const widget = { ...item.data, childrenWidgets: [] };
    map[widget.id] = widget;
  });

  Object.values(map).forEach(widget => {
    const parentId = widget.parent;
    
    if (parentId && map[parentId]) {
      map[parentId].childrenWidgets.push(widget);
    } else {
      tree.push(widget);
    }
  });

  return tree;
}

const convertQuantumToJSX = (tree, themesList) => {
  
  const parseStyle = (node) => {
    const styles = {};
    if (node._width_) styles.width = node._width_.value;
    if (node._height_) styles.height = node._height_.value;
    
    if (node.centerx?.value === "50%" && node.centery?.value === "50%") {
       styles.position = 'absolute';
       styles.left = '50%';
       styles.top = '50%';
       styles.transform = [{ translateX: '-50%' }, { translateY: '-50%' }];
    }
    return styles;
  };

  const traverse = (node) => {
    const { wType, id, _text_, _skin_, childrenWidgets } = node;
    const styleObj = parseStyle(node);
    const styleSkin = themesList.find(theme => theme.themeId === _skin_);
    console.log(styleSkin, 'styleSkin');
    const styleInline = JSON.stringify(styleObj).replace(/"([^"]+)":/g, '$1:');

    let childrenJSX = "";
    if (childrenWidgets && childrenWidgets.length > 0) {
      childrenJSX = childrenWidgets.map(child => traverse(child)).join('\n');
    }

    switch (wType) {
      case 'Form':
        return `<SafeAreaView style={styles.${_skin_ || 'container'}}>\n${childrenJSX}\n</SafeAreaView>`;
      
      case 'FlexContainer':
        return `<View id="${id}" style={[styles.${_skin_}, ${styleInline}]}>\n${childrenJSX}\n</View>`;
      
      case 'Button':
        return `
        <TouchableOpacity style={[styles.${_skin_}, ${styleInline}]}>
          <Text style={styles.btnText}>${_text_}</Text>
        </TouchableOpacity>`;
        
      default:
        return `<View>${childrenJSX}</View>`;
    }
  };

  const body = traverse(tree[0]);
  
  return `
    import React from 'react';
    import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

    const ${tree[0].id} = () => {
      return (
        ${body}
      );
    };

    const styles = StyleSheet.create({
      container: { flex: 1 },
      // Your CSS skins mapping goes here
      ${tree[0]._skin_}: { flex: 1, backgroundColor: '#fff' },
      s19732cc71f74982b56d7775d20ba47f: { flex: 1 }, // flxMain skin
      s3107773f6d047dbb85a29d5c6464574: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }, // btn skin
      btnText: { color: 'white', textAlign: 'center' }
    });

    export default ${tree[0].id};
  `;
};

module.exports = { buildQuantumTree, convertQuantumToJSX };