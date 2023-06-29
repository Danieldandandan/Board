import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventDetail } from "../../services/eventService";

const EventInfo = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const [event, setEvent] = useState({});
  useEffect(() => {
    // const event = await getEvent();
    async function getEvent(id) {
      const event = await getEventDetail(id);
      setEvent(event);
    }
    getEvent(id);
  }, []);

  console.log(id);
  console.log(event);
  return (
    <div>
      <h1> EVENT INFO BOARD</h1>
      {/* <p>{event}</p> */}
    </div>
  );
};

// export default EventInfo;
// class EventInfo extends Component {
//   state = {};
//   async componentDidMount() {
//     // const { match } = this.props;
//     // const { id } = match.params;
//     // console.log(this.props);
//   }
//   render() {
//     // const { id } = useParams();
//     // console.log(id);
//     return <h1> EVENT INFO BOARD</h1>;
//   }
// }

export default EventInfo;
