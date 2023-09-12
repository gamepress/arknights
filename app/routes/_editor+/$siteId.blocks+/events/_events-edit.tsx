import type { ReactNode } from "react";
import { Fragment, useEffect, useState } from "react";

import { FloatingDelayGroup, offset } from "@floating-ui/react";
import { Disclosure, Menu, Popover } from "@headlessui/react";
import { Float } from "@headlessui-float/react";
import clsx from "clsx";
import {
   Calendar,
   ChevronDown,
   Copy,
   MoreVertical,
   MoveRight,
   Plus,
   Trash,
   X,
} from "lucide-react";
import { nanoid } from "nanoid";
import { Transforms, Node, Editor } from "slate";
import { ReactEditor, Slate, useSlate } from "slate-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "~/components";
import DatePicker from "~/components/datepicker/date-picker";
import TimePicker from "~/components/datepicker/time-picker";
import type { Time } from "~/components/datepicker/time-picker/types";
import {
   convertTimeToDate,
   getCurrentTime,
} from "~/components/datepicker/util";
import { useIsMount } from "~/hooks";

import { CountdownTimer } from "./CountdownTimer";
// import { Toolbar } from "../../components/Toolbar";
// eslint-disable-next-line import/no-cycle
import { EditorWithDnD } from "../../core/dnd";
import { useEditor } from "../../core/plugins";
import { BlockType } from "../../core/types";
import type {
   CustomElement,
   EventItemElement,
   EventsElement,
} from "../../core/types";
import { initialValue } from "../../core/utils";

export function BlockEvents({
   element,
   children,
}: {
   element: EventsElement;
   children: ReactNode;
}) {
   const editor = useSlate();

   return (
      <section>
         <div
            className="divide-color shadow-1 border-color bg-3 relative z-10 divide-y  rounded-lg
         border shadow-sm [&>*:nth-last-child(2)]:rounded-b-lg [&>*:nth-of-type(4n+1)]:bg-zinc-50
         [&>*:nth-of-type(4n+1)]:dark:bg-bg2Dark [&>*:nth-of-type(4n+3)]:bg-white [&>*:nth-of-type(4n+3)]:dark:bg-neutral-800/50"
         >
            {children}
         </div>
         <div
            contentEditable={false}
            className="relative  -mt-1 flex justify-end pr-[19px]"
         >
            <Tooltip placement="bottom-end" setDelay={800}>
               <TooltipTrigger>
                  <button
                     className="shadow-1 flex h-9 items-center justify-center gap-2 rounded-b-full border-2 border-zinc-200 bg-neutral-50
                     px-3 pb-0.5 text-xs font-bold shadow-sm hover:bg-white dark:border-zinc-700 dark:bg-bg3Dark dark:hover:bg-zinc-800"
                     onClick={() => {
                        const path = [
                           ReactEditor.findPath(editor, element),
                           element.children.length,
                        ];
                        Transforms.insertNodes(
                           editor,
                           {
                              id: nanoid(),
                              type: BlockType.EventItem,
                              children: [{ text: "" }],
                           },
                           //@ts-ignore
                           { at: path }
                        );
                     }}
                  >
                     <Plus
                        className="text-zinc-500 dark:text-zinc-300"
                        size={16}
                     />
                  </button>
               </TooltipTrigger>
               <TooltipContent>Add an event</TooltipContent>
            </Tooltip>
         </div>
      </section>
   );
}

export function BlockEventItem({
   element,
   children,
}: {
   element: EventItemElement;
   children: ReactNode;
}) {
   const today = new Date();
   const currentTime = getCurrentTime();

   const editor = useSlate();
   const [labelValue, setLabelValue] = useState(element?.label ?? "");
   const [startDate, setStartDate] = useState(
      element?.startDate ? new Date(element?.startDate) : today
   );
   const [endDate, setEndDate] = useState(
      element?.endDate ? new Date(element?.endDate) : today
   );

   const [startTime, setStartTime] = useState(
      element?.startTime ? element?.startTime : currentTime
   );
   const [endTime, setEndTime] = useState(
      element?.endTime ? element?.endTime : currentTime
   );

   function updateEditorValue(
      event: Time | Date | string | any,
      key: "startDate" | "startTime" | "endDate" | "endTime" | "label"
   ) {
      const path = ReactEditor.findPath(editor, element);
      if (key == "label") {
         return Transforms.setNodes<CustomElement>(
            editor,
            { [key]: event },
            {
               at: path,
            }
         );
      }

      const { startTime, endTime } = element;

      return Transforms.setNodes<CustomElement>(
         editor,
         {
            ...(key == "startDate" && {
               startDate: event,
               startTimestamp: convertTimeToDate(
                  startTime ?? {
                     hours: 0,
                     minutes: 0,
                  },
                  event
               ),
            }),
            ...(key == "endDate" && {
               endDate: event,
               endTimestamp: convertTimeToDate(
                  endTime ?? {
                     hours: 0,
                     minutes: 0,
                  },
                  event
               ),
            }),
            ...(key == "startTime" && {
               startTime: event,
               startTimestamp: convertTimeToDate(event, startDate),
            }),
            ...(key == "endTime" && {
               endTime: event,
               endTimestamp: convertTimeToDate(event, endDate),
            }),
         },
         {
            at: path,
         }
      );
   }
   const path = ReactEditor.findPath(editor, element);
   const updatedParent = Node.parent(editor, path);
   const isMount = useIsMount();

   useEffect(() => {
      if (!isMount) {
         const { startTimestamp, endTimestamp } = element;
         if (!startTimestamp || !endTimestamp) return;
         const currentChildren =
            updatedParent.children as EventsElement["children"];
         const today = new Date();
         // We separate active events so we can show them on top
         const activeEvents = currentChildren
            .filter(
               (row) =>
                  new Date(row?.startTimestamp as Date) <= today &&
                  new Date(row?.endTimestamp as Date)! > today
            )
            .sort(
               //@ts-ignore
               (a, b) => new Date(a.endTimestamp) - new Date(b.endTimestamp)
            );

         const upcomingEvents = currentChildren
            .filter((row) => new Date(row?.startTimestamp as Date) > today)
            .sort(
               //@ts-ignore
               (a, b) => new Date(a.startTimestamp) - new Date(b.startTimestamp)
            );

         const resultArray = [...activeEvents, ...upcomingEvents];
         return resultArray.forEach((row: any) => {
            Transforms.moveNodes<CustomElement>(editor, {
               at: [path[0]],
               match: (node: Node) =>
                  //@ts-ignore
                  Editor.isBlock(editor, node) && node.id === row?.id,
               to: [
                  path[0],
                  resultArray.findIndex((item: any) => item.id == row.id),
               ],
            });
         });
      }
   }, [startDate, startTime, endDate, endTime]);

   return (
      <Disclosure key={element.id}>
         {({ open, close }) => (
            <>
               <div
                  contentEditable={false}
                  className="flex w-full items-center gap-2 p-2.5 pl-4 shadow-sm first:rounded-t-lg "
               >
                  <input
                     placeholder="Start typing..."
                     onChange={(event) => {
                        setLabelValue(event.target.value);
                        updateEditorValue(event.target.value, "label");
                     }}
                     value={labelValue}
                     type="text"
                     className="flex-grow border-0 bg-transparent p-0 text-sm font-bold focus:ring-0"
                  />
                  <CountdownTimer element={element} />
                  <div className="flex items-center">
                     <section className="relative">
                        <Popover>
                           {({ open }) => (
                              <>
                                 <Float
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                    placement="bottom-end"
                                    offset={6}
                                 >
                                    <Popover.Button
                                       className="shadow-1 rounded-full border border-zinc-100 bg-white p-2.5 shadow-sm focus:outline-none dark:border-zinc-700/50 dark:bg-zinc-800"
                                       aria-label="Insert block below"
                                    >
                                       {open ? (
                                          <X className="text-1" size={14} />
                                       ) : (
                                          <Calendar size={14} />
                                       )}
                                    </Popover.Button>
                                    <Popover.Panel
                                       className="border-color shadow-1 min-h-[200px] transform
                               rounded-lg border bg-white shadow dark:bg-bg3Dark"
                                    >
                                       <section className="border-color flex items-center justify-between border-b">
                                          <div className="flex w-full items-center justify-between gap-2 p-3">
                                             <span className="text-xs font-bold underline decoration-zinc-200 underline-offset-2 dark:decoration-zinc-600">
                                                Start Time
                                             </span>
                                             <TimePicker
                                                onChange={(e) => {
                                                   setStartTime(e);
                                                   updateEditorValue(
                                                      e,
                                                      "startTime"
                                                   );
                                                }}
                                                value={startTime}
                                                minutesInterval={1}
                                             />
                                          </div>
                                          <div className="w-10">
                                             <MoveRight size={16} />
                                          </div>
                                          <div className="flex w-full items-center justify-between gap-2 p-3">
                                             <span className="text-xs font-bold underline decoration-zinc-200 underline-offset-2 dark:decoration-zinc-600">
                                                End Time
                                             </span>
                                             <TimePicker
                                                onChange={(e) => {
                                                   setEndTime(e);
                                                   updateEditorValue(
                                                      e,
                                                      "endTime"
                                                   );
                                                }}
                                                value={endTime}
                                                minutesInterval={1}
                                             />
                                          </div>
                                       </section>
                                       <section className="divide-color flex items-stretch divide-x">
                                          <DatePicker
                                             minDate={today}
                                             value={startDate}
                                             onChange={(e) => {
                                                setStartDate(e);
                                                updateEditorValue(
                                                   e,
                                                   "startDate"
                                                );
                                             }}
                                             weekStartsFrom="Monday"
                                          />
                                          <DatePicker
                                             value={endDate}
                                             onChange={(e) => {
                                                setEndDate(e);
                                                updateEditorValue(e, "endDate");
                                             }}
                                             minDate={startDate}
                                             weekStartsFrom="Monday"
                                          />
                                       </section>
                                    </Popover.Panel>
                                 </Float>
                              </>
                           )}
                        </Popover>
                     </section>
                  </div>
                  <Disclosure.Button>
                     <div
                        contentEditable={false}
                        className="bg-3 shadow-1 border-color flex h-8 w-8 flex-none items-center 
                        justify-center rounded-full border pt-0.5 shadow-sm"
                     >
                        <ChevronDown
                           className={clsx(
                              open ? "rotate-180" : "",
                              "transform transition duration-300 ease-in-out"
                           )}
                           size={18}
                        />
                     </div>
                  </Disclosure.Button>
                  <Menu as="div" className="relative">
                     {({ open }) => (
                        <Float
                           as={Fragment}
                           enter="transition ease-out duration-100"
                           enterFrom="transform opacity-0 scale-95"
                           enterTo="transform opacity-100 scale-100"
                           leave="transition ease-in duration-75"
                           leaveFrom="transform opacity-100 scale-100"
                           leaveTo="transform opacity-0 scale-95"
                           placement="bottom-end"
                           middleware={[
                              offset({
                                 mainAxis: 4,
                                 crossAxis: -6,
                              }),
                           ]}
                        >
                           <Menu.Button className="border-color shadow-1 bg-3 group/menu -mr-2.5 flex h-8 w-4 items-center justify-center rounded-lg rounded-r-none border border-r-0 shadow-sm transition duration-300">
                              {open ? (
                                 <X
                                    size={12}
                                    className="pl-0.5 transition duration-150 ease-in-out"
                                 />
                              ) : (
                                 <>
                                    <MoreVertical
                                       size={16}
                                       className="pl-0.5 transition duration-150 ease-in-out group-active/menu:translate-y-0.5"
                                    />
                                 </>
                              )}
                           </Menu.Button>
                           <Menu.Items className="border-color bg-3 shadow-1 flex flex-col items-center justify-center rounded-lg border shadow">
                              <FloatingDelayGroup
                                 delay={{ open: 1000, close: 200 }}
                              >
                                 <Menu.Item>
                                    <Tooltip placement="left">
                                       <TooltipTrigger>
                                          <button
                                             className="m-1 flex h-8 w-8 items-center justify-center gap-2 rounded-md text-sm font-bold hover:bg-zinc-100 dark:hover:bg-bg4Dark"
                                             onClick={() => {
                                                Transforms.delete(editor, {
                                                   at: path,
                                                });
                                             }}
                                          >
                                             <Trash
                                                size={14}
                                                className="text-red-400"
                                             />
                                          </button>
                                       </TooltipTrigger>
                                       <TooltipContent>Delete</TooltipContent>
                                    </Tooltip>
                                 </Menu.Item>
                                 <Menu.Item>
                                    <Tooltip placement="left">
                                       <TooltipTrigger>
                                          <button className="m-1 flex h-8 w-8 items-center justify-center gap-2 rounded-md text-sm font-bold hover:bg-zinc-100 dark:hover:bg-bg4Dark">
                                             <Copy size={14} />
                                          </button>
                                       </TooltipTrigger>
                                       <TooltipContent>Copy</TooltipContent>
                                    </Tooltip>
                                 </Menu.Item>
                              </FloatingDelayGroup>
                           </Menu.Items>
                        </Float>
                     )}
                  </Menu>
               </div>
               <Disclosure.Panel
                  contentEditable={false}
                  className="px-4 py-3 text-sm"
               >
                  <div className="hidden">{children}</div>
                  <NestedEventsEditor element={element} editor={editor} />
               </Disclosure.Panel>
            </>
         )}
      </Disclosure>
   );
}

function NestedEventsEditor({
   element,
   editor,
}: {
   element: EventItemElement;
   editor: Editor;
}) {
   const inlineEditor = useEditor();

   const path = ReactEditor.findPath(editor, element);

   function updateEditorValue(event: Time | Date | string | any) {
      Transforms.setNodes<CustomElement>(
         editor,
         {
            nestedContent: event,
         },
         {
            at: path,
         }
      );
   }

   return (
      <div className="relative mx-auto max-w-[728px] pb-4">
         <Slate
            onChange={updateEditorValue}
            editor={inlineEditor}
            initialValue={element.nestedContent ?? initialValue()}
         >
            {/* TODO - Toolbar doesn't work atm for nested editors */}
            {/* <Toolbar /> */}
            <EditorWithDnD editor={inlineEditor} />
         </Slate>
      </div>
   );
}