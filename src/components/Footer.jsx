import styled from "styled-components";

export default function Footer({ movieInfo, sessionInfo }) {
    const { title, posterURL } = movieInfo;

    return (
        <Info>
            <div className="poster">
                <img src={posterURL} alt={title} />
            </div>
            <div className="session-info">
                <h2>{title}</h2>
                {sessionInfo ?
                    <h2>{sessionInfo.day.weekday} - {sessionInfo.name}</h2>
                    :
                    <></>}
            </div>
        </Info>
    )
}


/**************************** css ****************************/

const Info = styled.footer`

    position: fixed;
    width: 100vw;
    height: 117px;
    left: 0px;
    bottom: 0px;

    background: #DFE6ED;
    border: 1px solid #9EADBA;
    
    display: flex;
    align-items: center;

    z-index: 1;

    .poster {
        width: 64px;
        height: 89px;
        left: 10px;
        bottom: 14px;
        margin: 0 10px;
        padding: 8px;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;

        img {
            width: 48px;
            height: 72px;
        }
    }

    .session-info {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        h2 {
            height: 30px;
            width: 100%;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 5vw;
            line-height: 15px;
            display: flex;
            text-align: left;
            justify-content: start;
            align-items: center;

            margin: 2px 4px;;

            color: #293845;
        }
    }
`;
