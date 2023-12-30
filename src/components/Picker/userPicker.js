import { useEffect, useState } from "react";
import { getUsersListByType } from "../../api";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FRIENDS, HOMIES, USER_TYPES } from "../../constants/users";
import { AddSubjectModal } from "../SubjectModal/addSubject";

export const UserPicker = () => {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState();
  const [refundAmounts, setRefundAmounts] = useState(
    Object.keys(USER_TYPES)?.map(() => {
      return 0;
    })
  );
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const options = Object.keys(USER_TYPES).map((e) => {
    return {
      label: USER_TYPES[e],
      value: e,
    };
  });

  useEffect(() => {
    const getAppData = async (type) => {
      // const usersList = await getUsersListByType();
      // if (usersList) {
      //     setUsers(usersList);
      // }
    };
    getAppData();
  }, []);
  useEffect(() => {
    switch (type) {
      case "HOMIES":
        setUsers(HOMIES);
        break;
      case "FRIENDS":
        setUsers(FRIENDS);
        break;
      default:
        setUsers(HOMIES);
        break;
    }
  }, [type]);
  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleAddSubject = (value) => {
    setSubjects([...subjects, value]);
  };
  const handleRemoveSubject = (label) => {
    const temp = subjects.filter((e) => e.label !== label);
    setSubjects(temp);
  };
  const handleCalculate = () => {
    const cal = subjects.map((e) => {
      let sumElements = [];
      const totalElCheck = e?.checkLists?.filter((c) => c)?.length;
      if (totalElCheck) {
        const total = e?.amount / totalElCheck;
        e?.checkLists.forEach((c, i) => {
          if (c) {
            sumElements.push(total);
          } else sumElements.push(0);
        });
      } else {
        sumElements = users?.map(() => 0);
      }
      return sumElements;
    });

    setRefundAmounts(
      users?.map((e, i) => {
        let total = 0;
        cal.forEach((c) => {
          total += c[i];
        });
        return total;
      })
    );
  };

  useEffect(() => {
    setSubjects([]);
  }, [type]);

  return (
    <>
      Group
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Group"
        onChange={handleChange}
      >
        {options.map((e) => {
          return <MenuItem value={e.value}>{e.label}</MenuItem>;
        })}
      </Select>
      <AddSubjectModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleAddSubject={handleAddSubject}
        handleRemoveSubject={handleRemoveSubject}
        users={users}
      ></AddSubjectModal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Amount</TableCell>

              <TableCell align="center">Users</TableCell>

              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((row, subjectIndex) => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.label}
                </TableCell>
                <TableCell align="center">{row.amount}</TableCell>

                <TableCell align="center">
                  <FormGroup>
                    {users.map((e, checkedIndex) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={false}
                              onChange={(e) => {
                                const temp = subjects;
                                temp[subjectIndex].checkLists[checkedIndex] =
                                  e.target.checked;
                                setSubjects(temp);
                              }}
                            />
                          }
                          label={e}
                        />
                      );
                    })}
                  </FormGroup>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleRemoveSubject(row.label)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* // Reponse table */}
      <Button onClick={handleCalculate}>Calculate</Button>
      <TableContainer sx={{ marginTop: "5rem" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row}
                </TableCell>
                <TableCell align="center">{refundAmounts[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
