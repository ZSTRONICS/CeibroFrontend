import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  AddStatusTag,
  CustomStack,
  DocName,
  Span,
  SubHeadingTag,
} from "components/CustomTags";
import { momentdeDateFormatWithDay } from "components/Utills/Globals";
import ImageBox from "components/Utills/ImageBox";
import ImageBoxWithDesp from "components/Utills/ImageBoxWithDesp";
import { IFile, TaskEvent, TaskEventType } from "constants/interfaces";
import * as React from "react";

interface IProps {
  events: TaskEvent[];
}
export default function AddedDetails(props: IProps) {
  const { events } = props;
  return (
    <div>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <SubHeadingTag sx={{ color: "black" }}>Added Detail</SubHeadingTag>
        </AccordionSummary>
        <AccordionDetails>
          {events.length > 0
            ? events.map((event: TaskEvent) => {
                const {
                  initiator,
                  createdAt,
                  eventType,
                  eventData,
                  commentData,
                } = event;
                switch (eventType) {
                  case TaskEventType.InvitedUser:
                    const phoneNumbers =
                      eventData?.map((data) => data.phoneNumber)?.join(", ") ||
                      "";
                    const hasMultiplePhoneNumbers =
                      eventData && eventData?.length > 1;
                    const phoneNumberText = hasMultiplePhoneNumbers
                      ? `${phoneNumbers};`
                      : phoneNumbers;

                    return (
                      <>
                        <CustomStack gap={1.2} py={0.8}>
                          <Span sx={{ fontSize: "12px" }}>invited by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>

                        <CustomStack gap={1.2} py={0.8}>
                          <DocName>{phoneNumberText}</DocName>
                        </CustomStack>
                        <Divider />
                      </>
                    );
                  case TaskEventType.ForwardTask:
                    return (
                      <React.Fragment key={event._id}>
                        <CustomStack gap={1.2} py={0.8}>
                          <DocName>{` ${momentdeDateFormatWithDay(
                            createdAt
                          )}`}</DocName>
                          <Span
                            sx={{ fontSize: "12px" }}
                          >{`${initiator.firstName} ${initiator.surName} forwarded task to:`}</Span>
                        </CustomStack>
                        <CustomStack gap={1.2} py={0.8}>
                          <DocName>{` ${momentdeDateFormatWithDay(
                            createdAt
                          )}`}</DocName>
                        </CustomStack>
                        <Divider />
                      </React.Fragment>
                    );
                  case TaskEventType.CancelTask:
                    return (
                      <React.Fragment key={event._id}>
                        <CustomStack gap={1.2} py={0.8}>
                          <Span sx={{ fontSize: "12px" }}>Canceled by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        <Span sx={{ fontSize: "12px" }}>
                          Task has been Canceled
                        </Span>
                        <Divider />
                      </React.Fragment>
                    );
                  case TaskEventType.DoneTask:
                    return (
                      <React.Fragment key={event._id}>
                        <CustomStack gap={1.2} py={0.8}>
                          <Span sx={{ fontSize: "12px" }}>Done by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        <Divider />
                      </React.Fragment>
                    );
                  case TaskEventType.Comment:
                    return (
                      <React.Fragment key={event._id}>
                        <CustomStack gap={1.2} py={0.8}>
                          <Span sx={{ fontSize: "12px" }}>Comment by</Span>
                          <DocName>{`${initiator.firstName} ${
                            initiator.surName
                          } ${momentdeDateFormatWithDay(createdAt)}`}</DocName>
                        </CustomStack>
                        {commentData?.message && (
                          <>
                            <AddStatusTag sx={{ color: "black" }}>
                              {commentData.message}
                            </AddStatusTag>
                            <Divider />
                          </>
                        )}
                        {commentData?.files.map((file: IFile) => (
                          <Box
                            key={file._id} // Add a unique key to help React identify elements
                            sx={{
                              marginRight: "16px",
                              marginBottom:
                                file.comment.length === 0 ? "0px" : "16px",
                            }}
                          >
                            {file.comment.length === 0 ? (
                              <ImageBox src={file.fileUrl} />
                            ) : (
                              <ImageBoxWithDesp
                                src={file.fileUrl}
                                comment={file.comment}
                              />
                            )}
                            <Divider />
                          </Box>
                        ))}
                      </React.Fragment>
                    );
                  default:
                    return null; // Handle any other event types as needed
                }
              })
            : "No task details added"}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
