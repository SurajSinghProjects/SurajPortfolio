import React from "react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";

const BaseCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  variant,
}) => {
  return (
    <Card
      sx={{ padding: 0 }}
      elevation={9}
      style={{ backgroundColor: variant }}
    >
      {cardheading ? (
        <CardContent>
          <Typography variant="h4">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px" }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems={"center"}
              mb={2}
            >
              <Box>
                {title ? <Typography variant="h4">{title}</Typography> : ""}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default BaseCard;
