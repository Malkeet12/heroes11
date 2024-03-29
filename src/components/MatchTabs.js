import styled from "@emotion/styled";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SouthIcon from "@mui/icons-material/South";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../actions/toastAction";
import { API } from "../actions/userAction";
import { FURL, URL } from "../constants/userConstants";
import { leaderboardChanges } from "../utils/leaderboardchanges";
import { TeamShort } from "./TeamShort";
import Commentary from "./commentary";
import ConfirmModal from "./confirmcontest";
import ScoreCard from "./scorecard/scorecard";
import SelectTeam from "./selectteam";
import Stats from "./stats";
const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
`;

const ContestContainerJ = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 10px;
`;

const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: var(--red);
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
  .MuiSlider-rail {
    background-color: #2bfd00 !important;
  }
`;

const ContestJ = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: var(--red);
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
  .MuiSlider-rail {
    background-color: #2bfd00 !important;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
  }
  del {
    margin-right: 10px;
  }
`;

const FreeButton = styled.button`
  background-color: var(--green);
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SliderContainer = styled.div``;
const SpotsLeft = styled.div``;

const SpotsRight = styled.div``;

const Last = styled.div`
  background-color: #f6f6f6;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  color: #888;
`;

const LastJ = styled.div`
  background-color: #f6f6f6;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: space-between;
  color: #888;
  h1 {
    padding: 0 0 !important;
  }
`;

const CreateTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: var(--black);
  color: #ffffff;
  width: 200px;
  margin: 0 auto;
  height: 35px;
  border-radius: 5px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
  margin-top: 10px;
`;

const Heading = styled.h3`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  margin-bottom: 20px;
  font-size: 12px;
  padding: 10px 10px;
`;

const JoinBtn = styled(Button)`
  background-color: var(--green);
  color: #ffffff;
  width: 80px;
`;

const JoincontestBtn = styled(Button)`
  background-color: var(--green);
  color: #ffffff;
  width: 180px;
  margin: 0 auto !important;
  &:hover {
    background-color: var(--green);
  }
`;

const JoinButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #dddddd;
  width: 100%;
  z-index: 100000000000000000000000000000;
  background-color: #ffffff;
  max-width: 550px;
  box-sizing: border-box;
`;

const NoContests = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 400px;
  img {
    max-width: 100%;
  }
`;

const StatusC = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #fef4de;
  border-bottom: 1px solid;
  border-bottom-color: currentcolor;
  border-color: rgba(106, 106, 106, 0.12);
`;

const TabP = styled(TabPanel)`
  .MuiBox-root {
    padding: 0 0 !important;
  }
`;

const M = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: flex;
  border: 1px solid #888;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin-right: 5px;
`;

const C = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 1px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const F = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: lowercase;
  font-size: 10px;
  margin-right: 5px;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MatchTabs({ tabs, g, livescore, selectedTab = 0 }) {
  const { id: matchId } = useParams();
  const [value, setValue] = React.useState(selectedTab);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const globalState = useSelector((state) => state);
  const { id } = useParams();
  const { match_details, matchlive } = useSelector((state) => state.match);
  const [open, setOpen] = React.useState(false);
  const [team, setTeam] = React.useState(null);
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [selectedTeam, setSelectedTeam] = React.useState(null);

  const [selectTeams, setSelectTeams] = React.useState({
    selected: false,
    team: null,
  });
  const [contest, setContest] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getplayers() {
      if (user?._id && id) {
        // const data = await axios.get(
        //   `${URL}/getteam/?matchId=${id}&userId=${user._id}`
        // );
        // const joinedC = await axios.get(
        //   `${URL}/getjoinedcontest/${id}?userId=${user._id}`
        // );
        // leaderboardChanges(joinedC.data.contests);
        // setContest([...joinedC.data.contests]);
        // setTeam([...data.data.team]);
        const teamData = await API.get(
          `${URL}/user/teams?matchId=${matchId}&userId=${user._id}`
        );
        setTeam(teamData.data.teams);
        const contestData = await API.get(
          `${URL}/contest/${user._id}/${matchId}`
        );
        setContest(contestData.data.contests);
      }
    }
    getplayers();
  }, [user, id]);
  useEffect(() => {
    async function getteams() {
      if (contest[0]?._id) {
        const teamdata = await API.get(
          `${URL}/user/teams?matchId=${matchId}&userId=${user._id}`
        );
        setLeaderboard(teamdata.data.teams);
      }
    }
    getteams();
  }, [contest]);

  useEffect(() => {
    if (selectTeams.team) {
      setOpen(true);
    }
  }, [selectTeams]);
  useEffect(() => {
    setSelectTeams({
      open: false,
      team: selectedTeam,
    });
  }, [selectedTeam]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = (i) => {
    if (
      !(matchlive?.result == "In Progress" || matchlive?.result == "Complete")
    ) {
      if (!team?.length > 0) {
        setValue(2);
        window.store.dispatch(
          showToast("create a team before joining contest!", "info")
        );
      } else {
        setModal(i);
        setSelectTeams({ selected: true, team: null });
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user && user._id) loadJoined();
  }, [user]);

  const handleJoin = async (t) => {
    console.log("join contest");
    const joinedC = await API.get(`${URL}/contest/${user._id}/${id}`);
    setContest([...joinedC.data.contests]);
    leaderboardChanges(joinedC.data.contests);
    window.store.dispatch(showToast("contest joined successfully"));
    setSelectTeams({ selected: false, team: t });
  };

  const loadJoined = async (t) => {
    console.log("join contest");
    const joinedC = await API.get(`${URL}/contest/${user._id}/${id}`);
    console.log(joinedC);
    setContest([...joinedC.data.contests]);
    leaderboardChanges(joinedC.data.contests);
    setSelectTeams({ selected: false, team: t });
  };
  console.log({ tabs });
  return (
    <div style={{ zIndex: "1" }}>
      {!selectTeams.selected ? (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              <Tab label="Contests" {...a11yProps(0)} />
              <Tab
                label={`My Contests(${contest && contest.length})`}
                {...a11yProps(1)}
              />
              <Tab
                label={`My Teams(${team && team?.length ? team.length : 0})`}
                {...a11yProps(2)}
              />
              <Tab disabled label="Commentary" {...a11yProps(3)} />
              <Tab disabled label="Scorecard" {...a11yProps(4)} />
              <Tab disabled label="Stats" {...a11yProps(5)} />
              <Tab disabled label="Live" {...a11yProps(6)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <ContestsContainer container item sm={12} xs={12}>
              {tabs &&
                tabs.map((tab) => (
                  <ContestContainer onClick={() => handleOpen(tab)}>
                    <Contest>
                      <First>
                        <p>Prize Pool</p>
                        <p>Entry</p>
                      </First>
                      <First>
                        <h1>{tab.price}</h1>
                        <First>
                          <del>{tab.entryFeeWithoutDiscount}</del>
                          <FreeButton>₹ {tab.entryFee}</FreeButton>
                        </First>
                      </First>
                      <SliderContainer>
                        <Slider
                          defaultValue={tab.totalSpots - tab.spotsLeft}
                          min={0}
                          max={tab.totalSpots}
                          disabled
                        />
                      </SliderContainer>
                      <First>
                        {/* <SpotsLeft>{tab.spotsLeft} spots left</SpotsLeft> */}
                        <SpotsRight>{tab.totalSpots} spots</SpotsRight>
                      </First>
                    </Contest>
                    <Last>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <F>1st</F> {tab?.prizeDetails[0]?.prize}
                      </p>
                      <EmojiEventsOutlinedIcon
                        style={{ margin: "0 5px 0 20px", marginBottom: "3px" }}
                      />
                      {tab.numWinners} Winners
                    </Last>
                  </ContestContainer>
                ))}
              <ConfirmModal
                open={open}
                setOpen={setOpen}
                handleclose={handleClose}
                modal={modal}
                teamid={selectedTeam?._id}
                id={id}
                loadJoined={loadJoined}
                setSelectedTeam={setSelectedTeam}
              />
            </ContestsContainer>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <ContestsContainer container item sm={12} xs={12}>
              {contest.length > 0 ? (
                contest.map((tab) => (
                  <ContestContainerJ
                    onClick={() =>
                      navigate(
                        `/contestdetail/${matchId}/${tab.contestData._id}`,
                        {
                          state: {
                            match_details: matchlive,
                          },
                        }
                      )
                    }
                  >
                    <ContestJ>
                      <First>
                        <div>
                          <p>Prize Pool</p>₹{tab?.contestData?.price}
                        </div>
                        <div>
                          <p>spots</p>
                          <p>
                            {`${tab?.contestData?.totalSpots - tab?.contestData?.spotsLeft} /
                             ${tab?.contestData?.totalSpots}`}
                          </p>
                        </div>
                        <div>
                          <p>Entry</p>
                          <p>₹{tab?.contestData?.entryFee}</p>
                        </div>
                        {matchlive?.result == "Complete" && (
                          <h5
                            style={{
                              color: "var(--green)",
                              fontFamily: "OpenSans",
                            }}
                          >
                            u won {tab?.team?.won}
                            rs!
                          </h5>
                        )}
                      </First>
                    </ContestJ>
                    <LastJ>
                      <div>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <F>1st</F> {tab?.contestData?.prizeDetails[0]?.prize}
                        </p>
                      </div>
                      <First>
                        <EmojiEventsOutlinedIcon />{" "}
                        {tab?.contestData.numWinners} Winners
                      </First>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <M>m</M>
                        <C>c</C>
                      </div>
                    </LastJ>
                    {/* {tab.teams.map((t) => (
                      <>
                        <StatusC>
                          <SpotsLeft>
                            {t?.username}
                            {matchlive?.result == "Complete" ? (
                              <p
                                style={{
                                  color: "var(--green)",
                                  fontSize: "12px",
                                }}
                              >
                                you won ₹{t.won}
                              </p>
                            ) : (
                              <p
                                style={{
                                  color: "var(--green)",
                                  fontSize: "12px",
                                }}
                              >
                                IN WINNING ZONE
                              </p>
                            )}
                          </SpotsLeft>
                          <SpotsLeft>{t?.teamnumber}</SpotsLeft>
                          <SpotsLeft>{t?.points}</SpotsLeft>
                          <SpotsRight
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            #{t?.rank}
                            {t?.rank <
                            tab?.contestData?.prizeDetails?.length ? (
                              <ArrowUpwardIcon
                                style={{
                                  color: "var(--green)",
                                  fontSize: "18px",
                                  marginLeft: "5px",
                                }}
                              />
                            ) : (
                              <SouthIcon
                                style={{
                                  color: "red",
                                  fontSize: "18px",
                                  marginLeft: "5px",
                                }}
                              />
                            )}
                          </SpotsRight>
                        </StatusC>
                      </>
                    ))} */}
                  </ContestContainerJ>
                ))
              ) : (
                <NoContests>
                  <p> you have not joined a contest yet!</p>
                  <img src={`${FURL}/contest.png`} alt="" />
                  <p>What are you waiting for?</p>
                  <JoincontestBtn onClick={() => setValue(0)}>
                    join a contest
                  </JoincontestBtn>
                </NoContests>
              )}
            </ContestsContainer>
          </TabPanel>

          <TabPanel value={value} index={2}>
            {team?.length > 0 &&
              team.map((t, index) => <TeamShort t={t} index={index} />)}
            {!(
              matchlive?.result == "In Progress" ||
              matchlive?.result == "Complete"
            ) && (
              <CreateTeam onClick={() => navigate(`/createteam/${id}`)}>
                <AddCircleOutlineRoundedIcon />
                create team
              </CreateTeam>
            )}
          </TabPanel>
          <TabP value={value} index={3}>
            <Commentary matchdata={match_details} />
          </TabP>
          <TabP value={value} index={4}>
            <ScoreCard data={matchlive} g={g} livescore={livescore} />
          </TabP>
          <TabP value={value} index={5}>
            <Stats matchdata={matchlive || match_details} team={team} />
          </TabP>
          <TabP value={value} index={6}>
            <video
              id="videoPlayer"
              width="100%"
              controls
              autoPlay
              muted={false}
            >
              <source src={`${URL}/video`} type="video/mp4" />
            </video>
          </TabP>
        </Box>
      ) : (
        team?.length > 0 && (
          <>
            <Heading>You can Enter 1 team in this contest</Heading>
            {team.map((t, index) => (
              <SelectTeam
                players={t.players}
                plo={t}
                id={id}
                selectTeams={selectTeams}
                setSelectTeams={setSelectTeams}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                match={matchlive || match_details}
                matchdetails={match_details}
                index={index}
              />
            ))}
            <JoinButtonContainer>
              <p>Join with</p>
              <JoinBtn onClick={handleJoin}>Join</JoinBtn>
            </JoinButtonContainer>
          </>
        )
      )}
    </div>
  );
}
