import { useState } from "react";
import { ColorPicker, Avatar } from "@mantine/core";

const UserSettings = () => {
  const colorMap = {
    "#e03131": "red.7",
    "#9775fa": "violet.4",
    "#4dabf7": "blue4",
    "#38d9a9": "teal.4",
    "#a9e34b": "lime.4",
    "#ffd43b": "yellow.4",
    "#fd7e14": "orange.6",
  };
  const [colorValue, onChange] = useState<keyof typeof colorMap>("#e03131");

  return (
    <>
      <ColorPicker
        format="hex"
        value={colorValue}
        onChange={onChange as any}
        withPicker={false}
        swatches={[...Object.keys(colorMap)]}
      />
      <Avatar color={colorMap[colorValue]} radius="xl" />
    </>
  );
};

export default UserSettings;
