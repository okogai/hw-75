import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  decodeMessageSelector,
  encodeMessageSelector,
  loadingSelector,
  resetForm,
} from "../../store/slices/decodeSlice";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import {
  decodeMessageFetch,
  encodeMessageFetch,
} from "../../store/thunks/decodeThunks.ts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const DecodeEncodeForm = () => {
  const decodeMessage = useAppSelector(decodeMessageSelector);
  const encodeMessage = useAppSelector(encodeMessageSelector);
  const loading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState<string>("");
  const [decodedInput, setDecodedInput] = useState<string>("");
  const [encodedInput, setEncodedInput] = useState<string>("");

  const handleEncode = () => {
    if (password && decodedInput) {
      dispatch(encodeMessageFetch({ password, message: decodedInput }));
    }
  };

  const handleDecode = () => {
    if (password && encodedInput) {
      dispatch(decodeMessageFetch({ password, message: encodedInput }));
    }
  };

  const handleReset = () => {
    dispatch(resetForm());
    setPassword("");
    setDecodedInput("");
    setEncodedInput("");
  };

  useEffect(() => {
    setEncodedInput(encodeMessage);
  }, [encodeMessage]);

  useEffect(() => {
    setDecodedInput(decodeMessage);
  }, [decodeMessage]);

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Vigenere Cipher
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" marginY={2}>
          <CircularProgress />
        </Box>
      )}

      <Card style={{ marginBottom: "2rem" }}>
        <CardContent>
          <Typography variant="h6">Decoded Message</Typography>
          <TextareaAutosize
            minRows={4}
            placeholder="Decoded message will appear here"
            value={encodedInput}
            onChange={(e) => setEncodedInput(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <TextField
            fullWidth
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            marginBottom={"1rem"}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleDecode}
              disabled={!password || !encodedInput}
              style={{ height: "40px" }}
            >
              <KeyboardArrowDownIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReset}
              disabled={!encodedInput || !decodedInput}
              style={{ height: "40px" }}
            >
              <RestartAltIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEncode}
              disabled={!password || !decodedInput}
              style={{ height: "40px" }}
            >
              <KeyboardArrowUpIcon />
            </Button>
          </Box>
          <Typography variant="h6">Encode Message</Typography>
          <TextareaAutosize
            minRows={4}
            placeholder="Enter your message to encode"
            value={decodedInput}
            onChange={(e) => setDecodedInput(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem" }}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default DecodeEncodeForm;
