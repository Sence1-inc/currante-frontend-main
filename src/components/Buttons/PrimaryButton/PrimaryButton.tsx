import { LoadingButton } from "@mui/lab";

interface PrimaryButtonProps {
  text: string;
  url?: string;
  loading?: boolean;
  fullWidth?: boolean;
  handleClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  url,
  fullWidth,
  loading = false,
  handleClick,
}) => {
  return (
    <LoadingButton
      loading={loading}
      loadingPosition="center"
      sx={{
        py: 2,
        px: 6,
        borderRadius: 4,
        backgroundColor: "secondary.main",
        color: "common.white",
        variant: "h6",
        textTransform: "uppercase",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: "secondary.dark",
        },
      }}
      fullWidth={fullWidth}
      href={url}
      onClick={handleClick}
    >
      {text}
    </LoadingButton>
  );
};

export default PrimaryButton;
