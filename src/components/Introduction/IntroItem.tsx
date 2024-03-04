import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

interface IntroItemProps {
  title: string;
  desc: string;
  image: string;
}

const IntroItem: React.FC<IntroItemProps> = ({ title, desc, image }) => {
  return (
    <Card>
      <CardMedia component="img" alt="" height="140" image={image} />
      <CardHeader>
        <Typography variant="h3">{title}</Typography>
      </CardHeader>
      <CardContent>{desc}</CardContent>
    </Card>
  );
};

export default IntroItem;
