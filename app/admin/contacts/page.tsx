"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Eye,
    Mail,
    Trash2,
    Search,
    X,
    MessageSquare,
    CheckCircle2,
    Clock3,
    Loader2,
    Send,
} from "lucide-react";

import styles from "./ContactsAdmin.module.css";

interface Contact {
    _id: string;
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;

    isRead: boolean;
    isReplied: boolean;

    repliedAt?: string | null;

    createdAt: string;
    updatedAt?: string;
}

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

type ModalType = "view" | "reply" | null;

export default function ContactsAdmin() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<"all" | "unread" | "read" | "replied">(
            "all"
        );

    const [selectedContact, setSelectedContact] =
        useState<Contact | null>(null);

    const [modal, setModal] =
        useState<ModalType>(null);

    const [replySubject, setReplySubject] =
        useState("");

    const [replyMessage, setReplyMessage] =
        useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =====================================================
    // FETCH CONTACTS
    // =====================================================

    const fetchContacts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/contact`,
                {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.message ||
                        "Failed to fetch contacts."
                );
            }

            setContacts(
                Array.isArray(data.contacts)
                    ? data.contacts
                    : []
            );
        } catch (err) {
            console.error(
                "Fetch contacts error:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to fetch contacts."
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchContacts();
    }, []);


    // =====================================================
    // FILTER CONTACTS
    // =====================================================

    const filteredContacts = useMemo(() => {
        const query =
            search.trim().toLowerCase();

        return contacts.filter((contact) => {
            const matchesSearch =
                !query ||
                contact.fullName
                    .toLowerCase()
                    .includes(query) ||
                contact.email
                    .toLowerCase()
                    .includes(query) ||
                (contact.subject || "")
                    .toLowerCase()
                    .includes(query) ||
                contact.message
                    .toLowerCase()
                    .includes(query);

            if (!matchesSearch) {
                return false;
            }

            if (statusFilter === "unread") {
                return !contact.isRead;
            }

            if (statusFilter === "read") {
                return (
                    contact.isRead &&
                    !contact.isReplied
                );
            }

            if (statusFilter === "replied") {
                return contact.isReplied;
            }

            return true;
        });
    }, [
        contacts,
        search,
        statusFilter,
    ]);


    // =====================================================
    // OPEN VIEW MODAL
    // =====================================================

    const openViewModal = async (
        contact: Contact
    ) => {
        setSelectedContact(contact);
        setModal("view");

        if (!contact.isRead) {
            await markAsRead(contact);
        }
    };


    // =====================================================
    // MARK AS READ
    // =====================================================

    const markAsRead = async (
        contact: Contact
    ) => {
        try {
            const response = await fetch(
                `${API_URL}/contact/${contact._id}/read`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            if (!response.ok) {
                return;
            }

            setContacts((current) =>
                current.map((item) =>
                    item._id === contact._id
                        ? {
                              ...item,
                              isRead: true,
                          }
                        : item
                )
            );

            setSelectedContact((current) =>
                current &&
                current._id === contact._id
                    ? {
                          ...current,
                          isRead: true,
                      }
                    : current
            );
        } catch (err) {
            console.error(
                "Mark read error:",
                err
            );
        }
    };


    // =====================================================
    // OPEN REPLY
    // =====================================================

    const openReplyModal = (
        contact: Contact
    ) => {
        setSelectedContact(contact);

        setReplySubject(
            contact.subject
                ? `Re: ${contact.subject}`
                : "Re: Your PetCard enquiry"
        );

        setReplyMessage("");

        setError("");

        setModal("reply");
    };


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const closeModal = () => {
        if (actionLoading) {
            return;
        }

        setModal(null);
        setSelectedContact(null);

        setReplySubject("");
        setReplyMessage("");

        setError("");
    };


    // =====================================================
    // SEND REPLY
    // =====================================================

    const handleReply = async () => {
        if (!selectedContact) {
            return;
        }

        if (!replySubject.trim()) {
            setError(
                "Please enter a subject."
            );
            return;
        }

        if (!replyMessage.trim()) {
            setError(
                "Please enter your reply."
            );
            return;
        }

        try {
            setActionLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/contact/${selectedContact._id}/reply`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        subject:
                            replySubject.trim(),

                        message:
                            replyMessage.trim(),
                    }),
                }
            );

            if (response.status === 401) {
                window.location.href =
                    "/login";
                return;
            }

            const data =
                await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.message ||
                        "Failed to send reply."
                );
            }

            setContacts((current) =>
                current.map((item) =>
                    item._id ===
                    selectedContact._id
                        ? {
                              ...item,
                              isRead: true,
                              isReplied: true,
                              repliedAt:
                                  new Date().toISOString(),
                          }
                        : item
                )
            );

            setSuccess(
                "Reply sent successfully."
            );

            closeModal();

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            console.error(
                "Reply error:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to send reply."
            );
        } finally {
            setActionLoading(false);
        }
    };


    // =====================================================
    // DELETE CONTACT
    // =====================================================

    const handleDelete = async (
        contact: Contact
    ) => {
        const confirmed =
            window.confirm(
                `Are you sure you want to delete the message from ${contact.fullName}?`
            );

        if (!confirmed) {
            return;
        }

        try {
            setActionLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/contact/${contact._id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (response.status === 401) {
                window.location.href =
                    "/login";
                return;
            }

            const data =
                await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.message ||
                        "Failed to delete contact."
                );
            }

            setContacts((current) =>
                current.filter(
                    (item) =>
                        item._id !==
                        contact._id
                )
            );

            if (
                selectedContact?._id ===
                contact._id
            ) {
                closeModal();
            }

            setSuccess(
                "Contact deleted successfully."
            );

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            console.error(
                "Delete contact error:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete contact."
            );
        } finally {
            setActionLoading(false);
        }
    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (
        date: string
    ) => {
        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    // =====================================================
    // COUNTS
    // =====================================================

    const totalCount =
        contacts.length;

    const unreadCount =
        contacts.filter(
            (item) => !item.isRead
        ).length;

    const repliedCount =
        contacts.filter(
            (item) => item.isReplied
        ).length;


    // =====================================================
    // UI
    // =====================================================

    return (
        <div className={styles.page}>

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className={styles.pageHeader}>

                <div>

                    <div
                        className={
                            styles.titleRow
                        }
                    >
                        <div
                            className={
                                styles.titleIcon
                            }
                        >
                            <MessageSquare
                                size={22}
                            />
                        </div>

                        <div>
                            <span
                                className={
                                    styles.eyebrow
                                }
                            >
                                COMMUNICATION
                            </span>

                            <h1>
                                Contacts
                            </h1>
                        </div>
                    </div>

                    <p>
                        Manage customer enquiries
                        and respond directly from
                        the PetCard admin panel.
                    </p>

                </div>

            </div>


            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
                <div
                    className={
                        styles.success
                    }
                >
                    <CheckCircle2
                        size={17}
                    />

                    {success}
                </div>
            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {error && !modal && (
                <div
                    className={
                        styles.error
                    }
                >
                    {error}
                </div>
            )}


            {/* =================================================
                STATS
            ================================================= */}

            <div className={styles.statsGrid}>

                <div
                    className={
                        styles.statCard
                    }
                >
                    <div
                        className={
                            styles.statIcon
                        }
                    >
                        <MessageSquare
                            size={19}
                        />
                    </div>

                    <div>
                        <span>
                            Total Messages
                        </span>

                        <strong>
                            {totalCount}
                        </strong>
                    </div>
                </div>


                <div
                    className={
                        styles.statCard
                    }
                >
                    <div
                        className={
                            styles.statIcon
                        }
                    >
                        <Clock3
                            size={19}
                        />
                    </div>

                    <div>
                        <span>
                            Unread
                        </span>

                        <strong>
                            {unreadCount}
                        </strong>
                    </div>
                </div>


                <div
                    className={
                        styles.statCard
                    }
                >
                    <div
                        className={
                            styles.statIcon
                        }
                    >
                        <CheckCircle2
                            size={19}
                        />
                    </div>

                    <div>
                        <span>
                            Replied
                        </span>

                        <strong>
                            {repliedCount}
                        </strong>
                    </div>
                </div>

            </div>


            {/* =================================================
                TOOLBAR
            ================================================= */}

            <div
                className={
                    styles.toolbar
                }
            >

                <div
                    className={
                        styles.searchBox
                    }
                >
                    <Search
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search by name, email or subject..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() =>
                                setSearch("")
                            }
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>


                <div
                    className={
                        styles.filters
                    }
                >
                    {(
                        [
                            "all",
                            "unread",
                            "read",
                            "replied",
                        ] as const
                    ).map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            className={
                                statusFilter ===
                                filter
                                    ? styles.activeFilter
                                    : ""
                            }
                            onClick={() =>
                                setStatusFilter(
                                    filter
                                )
                            }
                        >
                            {filter === "all"
                                ? "All"
                                : filter
                                      .charAt(
                                          0
                                      )
                                      .toUpperCase() +
                                  filter.slice(1)}
                        </button>
                    ))}
                </div>

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div
                className={
                    styles.tableCard
                }
            >

                <div
                    className={
                        styles.tableHeader
                    }
                >
                    <div>
                        <h2>
                            Customer Messages
                        </h2>

                        <span>
                            {filteredContacts.length}{" "}
                            {filteredContacts.length ===
                            1
                                ? "message"
                                : "messages"}
                        </span>
                    </div>
                </div>


                {loading ? (
                    <div
                        className={
                            styles.state
                        }
                    >
                        <Loader2
                            size={28}
                            className={
                                styles.spinner
                            }
                        />

                        <p>
                            Loading contacts...
                        </p>
                    </div>
                ) : filteredContacts.length ===
                  0 ? (
                    <div
                        className={
                            styles.emptyState
                        }
                    >
                        <div
                            className={
                                styles.emptyIcon
                            }
                        >
                            <Mail
                                size={25}
                            />
                        </div>

                        <h3>
                            No messages found
                        </h3>

                        <p>
                            {search ||
                            statusFilter !==
                                "all"
                                ? "Try changing your search or filter."
                                : "Customer messages will appear here."}
                        </p>
                    </div>
                ) : (
                    <div
                        className={
                            styles.tableWrapper
                        }
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Message
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredContacts.map(
                                    (
                                        contact
                                    ) => (
                                        <tr
                                            key={
                                                contact._id
                                            }
                                            className={
                                                !contact.isRead
                                                    ? styles.unreadRow
                                                    : ""
                                            }
                                        >

                                            {/* CUSTOMER */}

                                            <td>
                                                <div
                                                    className={
                                                        styles.customer
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.avatar
                                                        }
                                                    >
                                                        {contact.fullName
                                                            .split(
                                                                " "
                                                            )
                                                            .map(
                                                                (
                                                                    word
                                                                ) =>
                                                                    word[0]
                                                            )
                                                            .join(
                                                                ""
                                                            )
                                                            .slice(
                                                                0,
                                                                2
                                                            )
                                                            .toUpperCase()}
                                                    </div>

                                                    <div
                                                        className={
                                                            styles.customerInfo
                                                        }
                                                    >
                                                        <strong>
                                                            {
                                                                contact.fullName
                                                            }
                                                        </strong>

                                                        <span>
                                                            {
                                                                contact.email
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>


                                            {/* SUBJECT */}

                                            <td>
                                                <span
                                                    className={
                                                        styles.subject
                                                    }
                                                >
                                                    {contact.subject ||
                                                        "No subject"}
                                                </span>
                                            </td>


                                            {/* MESSAGE */}

                                            <td>
                                                <p
                                                    className={
                                                        styles.messagePreview
                                                    }
                                                >
                                                    {
                                                        contact.message
                                                    }
                                                </p>
                                            </td>


                                            {/* STATUS */}

                                            <td>
                                                <div
                                                    className={
                                                        styles.statusStack
                                                    }
                                                >
                                                    {!contact.isRead ? (
                                                        <span
                                                            className={
                                                                styles.unreadBadge
                                                            }
                                                        >
                                                            Unread
                                                        </span>
                                                    ) : contact.isReplied ? (
                                                        <span
                                                            className={
                                                                styles.repliedBadge
                                                            }
                                                        >
                                                            Replied
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={
                                                                styles.readBadge
                                                            }
                                                        >
                                                            Read
                                                        </span>
                                                    )}
                                                </div>
                                            </td>


                                            {/* DATE */}

                                            <td>
                                                <span
                                                    className={
                                                        styles.date
                                                    }
                                                >
                                                    {formatDate(
                                                        contact.createdAt
                                                    )}
                                                </span>
                                            </td>


                                            {/* ACTIONS */}

                                            <td>
                                                <div
                                                    className={
                                                        styles.actions
                                                    }
                                                >

                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.viewButton
                                                        }
                                                        title="View message"
                                                        onClick={() =>
                                                            openViewModal(
                                                                contact
                                                            )
                                                        }
                                                    >
                                                        <Eye
                                                            size={17}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.replyButton
                                                        }
                                                        title="Reply"
                                                        onClick={() =>
                                                            openReplyModal(
                                                                contact
                                                            )
                                                        }
                                                    >
                                                        <Mail
                                                            size={17}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.deleteButton
                                                        }
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                contact
                                                            )
                                                        }
                                                    >
                                                        <Trash2
                                                            size={17}
                                                        />
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>


            {/* =================================================
                VIEW MODAL
            ================================================= */}

            {modal === "view" &&
                selectedContact && (
                    <div
                        className={
                            styles.modalOverlay
                        }
                        onMouseDown={(e) => {
                            if (
                                e.target ===
                                e.currentTarget
                            ) {
                                closeModal();
                            }
                        }}
                    >

                        <div
                            className={
                                styles.modal
                            }
                        >

                            <div
                                className={
                                    styles.modalHeader
                                }
                            >
                                <div>
                                    <span
                                        className={
                                            styles.modalEyebrow
                                        }
                                    >
                                        CUSTOMER MESSAGE
                                    </span>

                                    <h2>
                                        {
                                            selectedContact.fullName
                                        }
                                    </h2>

                                    <p>
                                        {
                                            selectedContact.email
                                        }
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={
                                        styles.closeButton
                                    }
                                    onClick={
                                        closeModal
                                    }
                                >
                                    <X
                                        size={19}
                                    />
                                </button>
                            </div>


                            <div
                                className={
                                    styles.modalBody
                                }
                            >

                                <div
                                    className={
                                        styles.infoGrid
                                    }
                                >
                                    <div>
                                        <span>
                                            Email
                                        </span>

                                        <strong>
                                            {
                                                selectedContact.email
                                            }
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Received
                                        </span>

                                        <strong>
                                            {formatDate(
                                                selectedContact.createdAt
                                            )}
                                        </strong>
                                    </div>
                                </div>


                                <div
                                    className={
                                        styles.queryBox
                                    }
                                >
                                    <span>
                                        Subject
                                    </span>

                                    <h3>
                                        {
                                            selectedContact.subject ||
                                            "No subject"
                                        }
                                    </h3>

                                    <div
                                        className={
                                            styles.queryMessage
                                        }
                                    >
                                        {
                                            selectedContact.message
                                        }
                                    </div>
                                </div>

                            </div>


                            <div
                                className={
                                    styles.modalFooter
                                }
                            >

                                <button
                                    type="button"
                                    className={
                                        styles.cancelButton
                                    }
                                    onClick={
                                        closeModal
                                    }
                                >
                                    Close
                                </button>

                                <button
                                    type="button"
                                    className={
                                        styles.sendReplyButton
                                    }
                                    onClick={() =>
                                        openReplyModal(
                                            selectedContact
                                        )
                                    }
                                >
                                    <Mail
                                        size={17}
                                    />

                                    Reply
                                </button>

                            </div>

                        </div>

                    </div>
                )}


            {/* =================================================
                REPLY MODAL
            ================================================= */}

            {modal === "reply" &&
                selectedContact && (
                    <div
                        className={
                            styles.modalOverlay
                        }
                        onMouseDown={(e) => {
                            if (
                                e.target ===
                                e.currentTarget
                            ) {
                                closeModal();
                            }
                        }}
                    >

                        <div
                            className={
                                styles.replyModal
                            }
                        >

                            {/* HEADER */}

                            <div
                                className={
                                    styles.modalHeader
                                }
                            >
                                <div>
                                    <span
                                        className={
                                            styles.modalEyebrow
                                        }
                                    >
                                        PETCARD SUPPORT
                                    </span>

                                    <h2>
                                        Reply to{" "}
                                        {
                                            selectedContact.fullName
                                        }
                                    </h2>

                                    <p>
                                        Send a response
                                        directly to the
                                        customer's email.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className={
                                        styles.closeButton
                                    }
                                    onClick={
                                        closeModal
                                    }
                                    disabled={
                                        actionLoading
                                    }
                                >
                                    <X
                                        size={19}
                                    />
                                </button>
                            </div>


                            <div
                                className={
                                    styles.modalBody
                                }
                            >

                                {error && (
                                    <div
                                        className={
                                            styles.modalError
                                        }
                                    >
                                        {error}
                                    </div>
                                )}


                                {/* TO */}

                                <div
                                    className={
                                        styles.formGroup
                                    }
                                >
                                    <label>
                                        To
                                    </label>

                                    <div
                                        className={
                                            styles.emailField
                                        }
                                    >
                                        <Mail
                                            size={17}
                                        />

                                        <span>
                                            {
                                                selectedContact.email
                                            }
                                        </span>
                                    </div>
                                </div>


                                {/* ORIGINAL QUERY */}

                                <div
                                    className={
                                        styles.originalQuery
                                    }
                                >
                                    <div
                                        className={
                                            styles.originalQueryHeader
                                        }
                                    >
                                        <span>
                                            ORIGINAL QUERY
                                        </span>

                                        {selectedContact.isReplied && (
                                            <span
                                                className={
                                                    styles.repliedBadge
                                                }
                                            >
                                                Replied
                                            </span>
                                        )}
                                    </div>

                                    <strong>
                                        {
                                            selectedContact.subject ||
                                            "No subject"
                                        }
                                    </strong>

                                    <p>
                                        {
                                            selectedContact.message
                                        }
                                    </p>
                                </div>


                                {/* SUBJECT */}

                                <div
                                    className={
                                        styles.formGroup
                                    }
                                >
                                    <label>
                                        Subject
                                    </label>

                                    <input
                                        className={
                                            styles.input
                                        }
                                        value={
                                            replySubject
                                        }
                                        onChange={(e) =>
                                            setReplySubject(
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="Re: Your PetCard enquiry"
                                        disabled={
                                            actionLoading
                                        }
                                    />
                                </div>


                                {/* REPLY */}

                                <div
                                    className={
                                        styles.formGroup
                                    }
                                >
                                    <label>
                                        Your Reply
                                    </label>

                                    <textarea
                                        className={
                                            styles.textarea
                                        }
                                        rows={8}
                                        value={
                                            replyMessage
                                        }
                                        onChange={(e) =>
                                            setReplyMessage(
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="Write your reply to the customer..."
                                        disabled={
                                            actionLoading
                                        }
                                    />
                                </div>

                            </div>


                            <div
                                className={
                                    styles.modalFooter
                                }
                            >

                                <button
                                    type="button"
                                    className={
                                        styles.cancelButton
                                    }
                                    onClick={
                                        closeModal
                                    }
                                    disabled={
                                        actionLoading
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className={
                                        styles.sendReplyButton
                                    }
                                    onClick={
                                        handleReply
                                    }
                                    disabled={
                                        actionLoading
                                    }
                                >
                                    {actionLoading ? (
                                        <>
                                            <Loader2
                                                size={17}
                                                className={
                                                    styles.spinner
                                                }
                                            />

                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send
                                                size={17}
                                            />

                                            Send Reply
                                        </>
                                    )}
                                </button>

                            </div>

                        </div>

                    </div>
                )}

        </div>
    );
}