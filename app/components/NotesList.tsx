"use client";

import { useEffect, useState } from "react";
import { Search, PenSquare, LayoutGrid, List, Trash } from "lucide-react";
import { Note } from "../types";
import { useAtom } from "jotai";
import { selectedNoteAtom, selectedCollectionAtom } from "@/app/atoms";
import { getNotesInCollection, loadDatabase } from "@/lib/orm";

interface NoteItemProps {
    title: string;
    date: string;
    image?: string;
    onClick?: () => void;
}

const NoteItem = ({ title, date, image, onClick }: NoteItemProps) => (
    <div className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClick}>
        <div>
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
        </div>
        {image && <img src={image} alt={title} className="w-10 h-10 object-cover rounded" />}
    </div>
);

const NotesList = () => {
    const [selectedNote, setSelectedNote] = useAtom(selectedNoteAtom);
    const [selectedCollection] = useAtom(selectedCollectionAtom);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            if (selectedCollection) {
                const db = await loadDatabase();
                const collectionNotes = await getNotesInCollection(db, selectedCollection);
                setNotes(collectionNotes);
            } else {
                setNotes([]);
            }
        };

        fetchNotes();
    }, [selectedCollection]);

    return (
        <div className="shrink-0 w-80 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <PenSquare size={20} className="text-gray-600 dark:text-gray-400" />
                    <div className="flex space-x-2">
                        <LayoutGrid size={20} className="text-gray-600 dark:text-gray-400" />
                        <List size={20} className="text-gray-600 dark:text-gray-400" />
                        <Trash size={20} className="text-gray-600 dark:text-gray-400" />
                    </div>
                </div>
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notes"
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-6rem)]">
                <div className="py-2 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Notes</div>
                {notes.map((note) => (
                    <NoteItem
                        key={note.id}
                        title={note.title}
                        date={new Date(note.updated_at).toLocaleDateString()}
                        onClick={() => setSelectedNote(note)}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesList;