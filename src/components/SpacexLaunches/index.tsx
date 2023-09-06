import { gql, useQuery } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";
import "./index.css";
import { useEffect } from "react";

interface Data {
  mission_name: string;
  launch_date_utc: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    article_link: string;
    video_link: string;
  };
}

const GetLaunchDetails = gql`
  query Query {
    launchesPast {
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
      links {
        article_link
        video_link
      }
    }
  }
`;

const GetLaunchDetailsWithPagination = gql`
  query Query($limit: Int, $offset: Int) {
    launchesPast(limit: $limit, offset: $offset) {
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
      links {
        article_link
        video_link
      }
    }
  }
`;

const SpaceXLaunches = () => {
  const { data, loading, error, fetchMore } = useQuery(
    GetLaunchDetailsWithPagination,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: 0,
        limit: 10,
      },
    }
  );

  if (data === undefined && loading) {
    return (
      <div className="div-main">
        <TailSpin color="#0b69ff" height="50" width="50" />
      </div>
    );
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return data === undefined ? (
    <div>Hello</div>
  ) : (
    <div className="div-main">
      (
      <ul className="div-launches-card" id="list">
        {data.launchesPast.map((eachLaunch: Data, ind: number) => {
          return (
            <li
              className="launch-item"
              key={ind}
              onMouseOver={() => {
                if (
                  data.launchesPast.length - 1 === ind &&
                  data.launchesPast.length < 187
                ) {
                  console.log("...Scrolling");
                  fetchMore({
                    variables: {
                      offset: data.launchesPast.length,
                      limit: data.launchesPast.length + 10,
                    },
                  });
                }
              }}
            >
              <h1 className="no-margin">
                MissionName: {eachLaunch.mission_name}
              </h1>
              <p className="no-margin">
                Launch Date: {"  "}
                {eachLaunch.launch_date_utc}
              </p>
              <p className="no-margin">
                Rocket Used: {eachLaunch.rocket.rocket_name}
              </p>
              <div className="links-div">
                <h5 className="link-margin">
                  <a target="_blank" href={`${eachLaunch.links.article_link}`}>
                    Article
                  </a>
                </h5>
                <h5>
                  <a target="_blank" href={`${eachLaunch.links.video_link}`}>
                    Launch Vedio
                  </a>
                </h5>
              </div>
            </li>
          );
        })}
        <li>
          {loading && (
            <div className="loader-div">
              <TailSpin color="#0b69ff" height="50" width="50" />
            </div>
          )}
        </li>
      </ul>
      )
    </div>
  );
};

export default SpaceXLaunches;
