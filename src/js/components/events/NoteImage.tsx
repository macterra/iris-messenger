import { route } from 'preact-router';
import styled, { css, keyframes } from 'styled-components';

import { Event } from '../../lib/nostr-tools';
import Key from '../../nostr/Key';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const GalleryImage = styled.a`
  position: relative;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  background-color: #ccc;
  background-image: url(${(props) =>
    `https://imgproxy.iris.to/insecure/rs:fill:420:420/plain/${props.src}`});
  & .dropdown {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  & .dropbtn {
    padding-top: 0px;
    margin-top: -5px;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    color: white;
    user-select: none;
  }
  opacity: ${(props) => (props.fadeIn ? 0 : 1)};
  animation: ${(props) =>
    props.fadeIn
      ? css`
          ${fadeIn} 0.5s ease-in-out forwards
        `
      : 'none'};
`;

const onClick = (event, noteId) => {
  event.preventDefault();
  route('/' + Key.toNostrBech32Address(noteId, 'note'));
};

export default function NoteImage(props: { event: Event; fadeIn?: boolean }) {
  // get first image url from event content
  const attachments = [];
  const urls = props.event.content.match(/(https?:\/\/[^\s]+)/g);
  if (urls) {
    urls.forEach((url) => {
      let parsedUrl;
      try {
        parsedUrl = new URL(url);
      } catch (e) {
        console.log('invalid url', url);
        return;
      }
      if (parsedUrl.pathname.toLowerCase().match(/\.(jpg|jpeg|gif|png|webp)$/)) {
        attachments.push({ type: 'image', data: `${parsedUrl.href}` });
      }
    });
  }
  // return all images from post
  return (
    <>
      {attachments.map((attachment) => (
        <GalleryImage
          onClick={(e) => onClick(e, props.event.id)}
          src={attachment.data}
          fadeIn={props.fadeIn}
        />
      ))}
    </>
  );
}
