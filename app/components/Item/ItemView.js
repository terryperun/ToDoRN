import React from 'react';
import {
  View,
  Text,
  CheckBox,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import s from './styles';

const ItemView = ({
  isEditing,
  setIsEditing,
  textItem,
  completed,
  onSubmit,
  onPress,
  setTextItem,
  onLongPress,
}) => {
  const editingField = isEditing ? (
    <View style={s.containerEditing}>
      <View style={s.containerInput}>
        <TextInput
          autoFocus
          onChangeText={(text) => setTextItem(text)}
          value={textItem}
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  ) : (
    <View style={s.task}>
      <Text style={s.textTask}>{textItem}</Text>
    </View>
  );
  return (
    <TouchableOpacity
      style={s.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={s.checkBox}>
        <CheckBox value={completed} disabled={completed} />
      </View>
      {editingField}
    </TouchableOpacity>
  );
};

export default ItemView;
// import React from 'react';
// import {
//   View,
//   Text,
//   CheckBox,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';

// import s from './styles';

// const Item = ({
//   text,
//   completed,
//   onLongPress,
//   idItemIsEditing,
//   toggleEditing,
//   id,
//   // newTaskInputText,
//   showBtnDone,
//   hideBtnDone,
//   // addTodo,
//   editTodo,
//   // setNewTaskInputText,
//   editTaskInputText,
//   setEditTaskInputText,
// }) => {
//   const editingField =
//     idItemIsEditing === id ? (
//       <View style={s.containerEditing}>
//         <View style={s.containerInput}>
//           <TextInput
//             autoFocus
//             value={editTaskInputText}
//             // value={newTaskInputText}
//             onFocus={showBtnDone}
//             onBlur={hideBtnDone}
//             onSubmitEditing={() => editTodo(id, text)}
//             // onSubmitEditing={addTodo}
//             onChangeText={setEditTaskInputText}
//             // onChangeText={setNewTaskInputText}
//           />
//         </View>
//       </View>
//     ) : (
//       <View style={s.task}>
//         <Text style={completed ? s.completedTask : s.textTask}>
//           {text}
//         </Text>
//       </View>
//     );
//   return (
//     <TouchableOpacity
//       style={s.container}
//       onLongPress={onLongPress}
//       onPress={() => toggleEditing(id, text)}
//     >
//       <View style={s.checkBox}>
//         <CheckBox value={completed} disabled={completed} />
//       </View>
//       {editingField}
//     </TouchableOpacity>
//   );
// };

// export default Item;
